import { Component } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  viewDate = new Date();
  view: CalendarView = CalendarView.Month;

  readonly CalendarView = CalendarView;
}
