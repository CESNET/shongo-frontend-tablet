import { ICalendarItem, IInterval } from '@CESNET/shongo-calendar';
import { Injectable, signal } from '@angular/core';
import { ERequestState } from '@app/models/enums';
import { IRequest } from '@app/models/interfaces';
import { CalendarView } from 'angular-calendar';
import { Observable, Subject } from 'rxjs';
import { ReservationService } from './reservation.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  readonly nextView$: Observable<void>;
  readonly previousView$: Observable<void>;

  readonly viewSig = signal<CalendarView>(CalendarView.Month);
  readonly viewDateSig = signal<Date>(new Date());
  readonly requestSig = signal<IRequest<ICalendarItem[]>>({
    data: [],
    state: ERequestState.LOADING
  });

  private _currentInterval: IInterval | null = null;

  private readonly _nextView$ = new Subject<void>();
  private readonly _previousView$ = new Subject<void>();

  constructor(private _reservationS: ReservationService) {
    this.nextView$ = this._nextView$.asObservable();
    this.previousView$ = this._previousView$.asObservable();
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
