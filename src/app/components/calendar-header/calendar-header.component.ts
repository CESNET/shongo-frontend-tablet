import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarService } from '@app/services/calendar.service';
import { I18nService } from '@app/services/i18n.service';
import { ModalHelperService } from '@app/services/modal-helper.service';
import { IInterval } from '@cesnet/shongo-calendar';

@Component({
  selector: 'header[app-calendar-header]',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarHeaderComponent {
  @Output() reservationCreated = new EventEmitter<void>();
  @Input() selectedSlot: IInterval | null = null;

  constructor(
    public calendarS: CalendarService,
    public i18nS: I18nService,
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
