import { Component, Signal, computed } from '@angular/core';
import { ERequestState } from '@app/models/enums/request-state.enum';
import { CalendarService } from '@app/services/calendar.service';
import { IInterval } from '@cesnet/shongo-calendar';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.scss'],
  providers: [CalendarService]
})
export class ReservationPageComponent {
  selectedSlot: IInterval | null = null;

  readonly isLoadingSig: Signal<boolean>;
  readonly CalendarView = CalendarView;
  readonly ERequestState = ERequestState;

  constructor(public calendarS: CalendarService) {
    this.isLoadingSig = computed(() => this.calendarS.stateSig() === ERequestState.LOADING);
  }

  onSlotSelected(slot: IInterval | null): void {
    this.selectedSlot = slot;
  }
}
