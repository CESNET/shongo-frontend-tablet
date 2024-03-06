import { Component, Input } from '@angular/core';
import { CalendarService } from '@app/services';
import { IInterval } from '@CESNET/shongo-calendar';

@Component({
  selector: 'header[app-calendar-header]',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent {
  @Input() selectedSlot: IInterval | null = null;

  constructor(public calendarS: CalendarService) {}
}
