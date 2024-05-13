import { Component, Inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '@app/services/notification.service';
import { ReservationService } from '@app/services/reservation.service';
import { IInterval } from '@cesnet/shongo-calendar';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-create-reservation-modal',
  templateUrl: './create-reservation-modal.component.html',
  styleUrls: ['./create-reservation-modal.component.scss']
})
export class CreateReservationModalComponent {
  readonly form = this._fb.group({
    description: ['', Validators.required]
  });
  readonly isCreatingSig = signal(false);

  constructor(
    private _fb: FormBuilder,
    private _reservationS: ReservationService,
    private _dialogRef: MatDialogRef<CreateReservationModalComponent>,
    private _notificationS: NotificationService,
    @Inject(MAT_DIALOG_DATA) private _data: { slot: IInterval }
  ) {}

  get slot(): IInterval {
    return this._data.slot;
  }

  onCreate(): void {
    if (this.isCreatingSig()) {
      return;
    }

    this.isCreatingSig.set(true);

    const description = this.form.value.description;

    if (!this.slot || !description) {
      throw new Error('Slot or description is not defined');
    }

    this._reservationS
      .createReservation$(this.slot, description)
      .pipe(
        catchError((err) => {
          this._notificationS.error('Failed to create reservation');
          throw err;
        })
      )
      .subscribe({
        next: () => {
          this._notificationS.success('Reservation created');
          this._dialogRef.close(true);
          this.isCreatingSig.set(false);
        },
        error: () => {
          this.isCreatingSig.set(false);
        }
      });
  }
}
