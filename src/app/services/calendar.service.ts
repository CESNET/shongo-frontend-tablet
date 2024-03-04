import { Injectable } from '@angular/core';
import { CalendarView } from 'angular-calendar';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  readonly view$: Observable<CalendarView>;
  readonly viewDate$: Observable<Date>;
  readonly nextView$: Observable<void>;
  readonly previousView$: Observable<void>;

  private _view$ = new BehaviorSubject<CalendarView>(CalendarView.Month);
  private _viewDate$ = new BehaviorSubject<Date>(new Date());
  private _nextView$ = new Subject<void>();
  private _previousView$ = new Subject<void>();

  constructor() {
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
}
