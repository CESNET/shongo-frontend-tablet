import { DestroyRef, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ERequestState } from '@app/models/enums/request-state.enum';
import { IRequest } from '@app/models/interfaces/request.interface';
import { ICalendarItem, IInterval } from '@cesnet/shongo-calendar';
import { CalendarView } from 'angular-calendar';
import { EMPTY, Observable, Subject, Subscription, catchError, filter, interval, switchMap, tap } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { ReservationService } from './reservation.service';

const RELOAD_INTERVAL_MIN = 5;

@Injectable()
export class CalendarService {
  readonly nextView$: Observable<void>;
  readonly previousView$: Observable<void>;

  readonly viewSig = signal<CalendarView>(CalendarView.Day);
  readonly viewDateSig = signal<Date>(new Date());
  readonly calendarItemsSig = signal<ICalendarItem[]>([]);
  readonly stateSig = signal<ERequestState>(ERequestState.LOADING);

  private _currentInterval: IInterval | null = null;
  private _loadSubscription?: Subscription;

  private readonly _nextView$ = new Subject<void>();
  private readonly _previousView$ = new Subject<void>();

  constructor(
    private _reservationS: ReservationService,
    private _authS: AuthenticationService,
    private _destroyRef: DestroyRef
  ) {
    this.nextView$ = this._nextView$.asObservable();
    this.previousView$ = this._previousView$.asObservable();

    this._startReloadInterval();
  }

  setView(view: CalendarView): void {
    this.viewSig.set(view);
  }

  setViewDate(viewDate: Date): void {
    this.viewDateSig.set(viewDate);
  }

  nextView(): void {
    this._nextView$.next();
  }

  previousView(): void {
    this._previousView$.next();
  }

  loadInterval(interval: IInterval): void {
    this._currentInterval = interval;
    this._loadSubscription = this._loadInterval$(interval, true).subscribe();
  }

  reloadInterval(): void {
    this._loadSubscription = this._reloadInterval$().subscribe();
  }

  /**
   * Will start an interval that will reload the current interval every RELOAD_INTERVAL_MIN minutes.
   */
  private _startReloadInterval(): void {
    interval(RELOAD_INTERVAL_MIN * 60 * 1000)
      .pipe(
        filter(() => this._authS.isAuthenticated),
        switchMap(() => this._reloadInterval$().pipe(catchError(() => EMPTY))),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }

  private _reloadInterval$(): Observable<IRequest<ICalendarItem[]>> {
    if (this._currentInterval) {
      return this._loadInterval$(this._currentInterval, false);
    }
    return EMPTY;
  }

  private _loadInterval$(interval: IInterval, showLoading?: boolean): Observable<IRequest<ICalendarItem[]>> {
    if (this._loadSubscription) {
      this._loadSubscription?.unsubscribe();
      this._loadSubscription = undefined;
    }

    return this._reservationS.fetchInterval$(interval).pipe(
      tap((request) => {
        const state = !showLoading && request.state === ERequestState.LOADING ? ERequestState.SUCCESS : request.state;
        this.stateSig.set(state);

        if (request.state === ERequestState.SUCCESS) {
          this.calendarItemsSig.set(request.data);
        }
      }),
      takeUntilDestroyed(this._destroyRef)
    );
  }
}
