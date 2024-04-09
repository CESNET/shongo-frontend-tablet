import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarService } from '@app/services';
import { ModalHelperService } from '@app/services/modal-helper.service';
import { IInterval } from '@cesnet/shongo-calendar';

@Component({
  selector: 'header[app-calendar-header]',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent {
  @Output() reservationCreated = new EventEmitter<void>();
  @Input() selectedSlot: IInterval | null = null;

  constructor(
    public calendarS: CalendarService,
    private _modalHelperS: ModalHelperService
  ) {}

  onReserve(): void {
    if (!this.selectedSlot) {
      return;
    }

    this._modalHelperS.openCreateReservation$(this.selectedSlot).subscribe((reservedSuccessfully) => {
      if (reservedSuccessfully) {
        this.reservationCreated.emit();
        this.calendarS.reloadInterval();
      }
    });
  }
}
