import { Component } from '@angular/core';
import { ERequestState } from '@app/models/enums';
import { CalendarService } from '@app/services';
import { IInterval } from '@cesnet/shongo-calendar';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.scss']
})
export class ReservationPageComponent {
  selectedSlot: IInterval | null = null;

  readonly CalendarView = CalendarView;
  readonly ERequestState = ERequestState;

  constructor(public calendarS: CalendarService) {}

  onSlotSelected(slot: IInterval | null): void {
    this.selectedSlot = slot;
  }
}
