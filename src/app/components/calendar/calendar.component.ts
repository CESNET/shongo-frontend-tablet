import { Component } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html'
})
export class CalendarComponent {
  viewDate = new Date();
  view: CalendarView = CalendarView.Month;

  readonly CalendarView = CalendarView;
}
