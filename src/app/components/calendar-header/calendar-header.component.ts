import { Component, Input } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent {
  @Input() viewDate!: Date;
  @Input() view!: CalendarView;
}
