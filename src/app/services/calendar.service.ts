import { ICalendarItem, IInterval } from '@CESNET/shongo-calendar';
import { Injectable, signal } from '@angular/core';
import { ERequestState } from '@app/models/enums';
import { IRequest } from '@app/models/interfaces';
import { CalendarView } from 'angular-calendar';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ReservationService } from './reservation.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  readonly view$: Observable<CalendarView>;
  readonly viewDate$: Observable<Date>;
  readonly nextView$: Observable<void>;
  readonly previousView$: Observable<void>;
  readonly requestSig = signal<IRequest<ICalendarItem[]>>({
    data: [],
    state: ERequestState.LOADING
  });

  private _view$ = new BehaviorSubject<CalendarView>(CalendarView.Month);
  private _viewDate$ = new BehaviorSubject<Date>(new Date());
  private _nextView$ = new Subject<void>();
  private _previousView$ = new Subject<void>();

  private _currentInterval: IInterval | null = null;

  constructor(private _reservationS: ReservationService) {
    this.view$ = this._view$.asObservable();
    this.viewDate$ = this._viewDate$.asObservable();
    this.nextView$ = this._nextView$.asObservable();
    this.previousView$ = this._previousView$.asObservable();
  }

  setView(view: CalendarView): void {
    this._view$.next(view);
  }

  setViewDate(viewDate: Date): void {
    this._viewDate$.next(viewDate);
  }

  nextView(): void {
    this._nextView$.next();
  }

  previousView(): void {
    this._previousView$.next();
  }

  loadInterval(interval: IInterval): void {
    this._currentInterval = interval;

    this._reservationS.fetchInterval$(interval).subscribe((request) => {
      this.requestSig.set(request);
    });
  }

  reloadInterval(): void {
    if (this._currentInterval) {
      this.loadInterval(this._currentInterval);
    }
  }
}
