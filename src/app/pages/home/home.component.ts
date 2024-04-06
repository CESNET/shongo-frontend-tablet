import { ICalendarItem, IInterval } from '@CESNET/shongo-calendar';
import { Component, signal } from '@angular/core';
import { ERequestState } from '@app/models/enums';
import { CalendarService } from '@app/services';
import { ReservationService } from '@app/services/reservation.service';
import { IRequest } from '@models/interfaces';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class CalendarComponent {
  selectedSlot: IInterval | null = null;

  readonly requestSig = signal<IRequest<ICalendarItem[]>>({
    data: [],
    state: ERequestState.LOADING
  });
  readonly CalendarView = CalendarView;
  readonly ERequestState = ERequestState;

  constructor(
    public calendarS: CalendarService,
    private _reservationS: ReservationService
  ) {}

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

  onSlotSelected(slot: IInterval | null): void {
    this.selectedSlot = slot;
  }

  onLoadData(interval: IInterval): void {
    this._reservationS.fetchInterval$(interval).subscribe((request) => {
      this.requestSig.set(request);
    });
  }
}
