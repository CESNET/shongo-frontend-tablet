import { Component } from '@angular/core';
import { CalendarService } from '@app/services';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class CalendarComponent {
  readonly CalendarView = CalendarView;

  constructor(public calendarS: CalendarService) {}

  onSwipeLeft(): void {
    this.calendarS.nextView();
  }

  onSwipeRight(): void {
    this.calendarS.previousView();
  }

  onViewChange(view: CalendarView): void {
    this.calendarS.setView(view);
  }

  onViewDateChange(date: Date): void {
    this.calendarS.setViewDate(date);
  }
}
