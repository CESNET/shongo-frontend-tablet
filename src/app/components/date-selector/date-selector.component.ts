import { Component } from '@angular/core';
import { CalendarService } from '@app/services';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'div[app-date-selector]',
  templateUrl: './date-selector.component.html'
})
export class DateSelectorComponent {
  readonly CalendarView = CalendarView;

  constructor(public calendarS: CalendarService) {}

  onViewDateChange(date: Date): void {
    this.calendarS.setViewDate(date);
  }

  onBackToMonth(): void {
    this.calendarS.setView(CalendarView.Month);
  }
}
