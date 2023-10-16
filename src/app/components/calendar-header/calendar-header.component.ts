import { Component } from '@angular/core';
import { CalendarService } from '@app/services';

@Component({
  selector: 'header[app-calendar-header]',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent {
  constructor(public calendarS: CalendarService) {}
}
