import { ChangeDetectionStrategy, Component, Inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslationPipe } from '@app/pipes/translation.pipe';
import { I18nService } from '@app/services';
import { NotificationService } from '@app/services/notification.service';
import { ReservationService } from '@app/services/reservation.service';
import { IInterval } from '@cesnet/shongo-calendar';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-create-reservation-modal',
  templateUrl: './create-reservation-modal.component.html',
  styleUrls: ['./create-reservation-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateReservationModalComponent {
  readonly form = this._fb.group({
    description: ['', Validators.required]
  });
  readonly isCreatingSig = signal(false);

  constructor(
    public i18nS: I18nService,
    private _fb: FormBuilder,
    private _reservationS: ReservationService,
    private _dialogRef: MatDialogRef<CreateReservationModalComponent>,
    private _notificationS: NotificationService,
    private _translationP: TranslationPipe,
    @Inject(MAT_DIALOG_DATA) private _data: { slot: IInterval }
  ) {}

  get slot(): IInterval {
    return this._data.slot;
  }

  onCreate(): void {
    if (this.isCreatingSig()) {
      return;
    }

    this._onCreateStart();
    const description = this.form.value.description;

    if (!this.slot || !description) {
      throw new Error('Slot or description is not defined');
    }

    this._reservationS
      .createReservation$(this.slot, description)
      .pipe(
        catchError((err) => {
          this._notificationS.error(
            this._translationP.transform('NOTIFICATION:RESERVATION_ERROR', this.i18nS.selectedLocaleValueSig())
          );
          throw err;
        })
      )
      .subscribe({
        next: () => {
          this._notificationS.success(
            this._translationP.transform('NOTIFICATION:RESERVATION_CREATED', this.i18nS.selectedLocaleValueSig())
          );
          this._dialogRef.close(true);
          this._onCreateEnd();
        },
        error: () => {
          this._onCreateEnd();
        }
      });
  }

  private _onCreateStart(): void {
    this.isCreatingSig.set(true);
    this._dialogRef.disableClose = true;
  }

  private _onCreateEnd(): void {
    this.isCreatingSig.set(false);
    this._dialogRef.disableClose = false;
  }
}
