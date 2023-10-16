import { Injectable } from '@angular/core';
import { CalendarView } from 'angular-calendar';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  readonly view$: Observable<CalendarView>;
  readonly viewDate$: Observable<Date>;

  private _view$ = new BehaviorSubject<CalendarView>(CalendarView.Month);
  private _viewDate$ = new BehaviorSubject<Date>(new Date());

  constructor() {
    this.view$ = this._view$.asObservable();
    this.viewDate$ = this._viewDate$.asObservable();
  }

  setView(view: CalendarView): void {
    this._view$.next(view);
  }

  setViewDate(viewDate: Date): void {
    this._viewDate$.next(viewDate);
  }
}
