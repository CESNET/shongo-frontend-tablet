import { Component, Input } from '@angular/core';
import { CalendarService } from '@app/services';
import { ModalHelperService } from '@app/services/modal-helper.service';
import { IInterval } from '@CESNET/shongo-calendar';

@Component({
  selector: 'header[app-calendar-header]',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent {
  @Input() selectedSlot: IInterval | null = null;

  constructor(
    public calendarS: CalendarService,
    private _modalHelperS: ModalHelperService
  ) {}

  onReserve(): void {
    this._modalHelperS.openCreateReservation$().subscribe();
  }
}
