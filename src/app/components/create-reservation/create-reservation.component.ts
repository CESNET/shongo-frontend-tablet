import { Component, Inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '@app/services/notification.service';
import { ReservationService } from '@app/services/reservation.service';
import { IInterval } from '@cesnet/shongo-calendar';
import { catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.scss']
})
export class CreateReservationComponent {
  readonly form = this._fb.group({
    description: ['', Validators.required]
  });
  readonly isCreatingSig = signal(false);

  constructor(
    private _fb: FormBuilder,
    private _reservationS: ReservationService,
    private _dialogRef: MatDialogRef<CreateReservationComponent>,
    private _notificationS: NotificationService,
    @Inject(MAT_DIALOG_DATA) private _data: { slot: IInterval }
  ) {}

  onCreate(): void {
    this.isCreatingSig.set(true);

    const description = this.form.value.description;
    const slot = this._data?.slot;

    if (!slot || !description) {
      throw new Error('Slot or description is not defined');
    }

    this._reservationS
      .createReservation$(slot, description)
      .pipe(
        catchError((err) => {
          this._notificationS.error('Failed to create reservation');
          throw err;
        }),
        finalize(() => {
          this.isCreatingSig.set(false);
        })
      )
      .subscribe(() => {
        this._notificationS.success('Reservation created');
        this._dialogRef.close(true);
      });
  }
}
