import { IInterval } from '@CESNET/shongo-calendar';
import { Component, Inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '@app/services/authentication.service';
import { ReservationService } from '@app/services/reservation.service';
import { ICreateReservation } from '@models/interfaces';
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
    private _authS: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) private _data: { slot: IInterval }
  ) {}

  onCreate(): void {
    this.isCreatingSig.set(true);

    const description = this.form.value.description;
    const slot = this._data?.slot;

    if (!slot || !description) {
      throw new Error('Slot or description is not defined');
    }

    const createReservation: ICreateReservation = {
      resource: this._authS.deviceResource!,
      description,
      slot,
      periodicity: {
        type: 'NONE'
      },
      type: 'PHYSICAL_RESOURCE'
    };

    this._reservationS
      .createReservation$(createReservation)
      .pipe(
        catchError((err) => {
          // TODO: Add alert
          throw err;
        }),
        finalize(() => {
          this.isCreatingSig.set(false);
        })
      )
      .subscribe(() => {
        this._dialogRef.close(true);
      });
  }
}
