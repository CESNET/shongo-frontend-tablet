import { IInterval } from '@CESNET/shongo-calendar';
import { Component, Inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReservationService } from '@app/services/reservation.service';
import { ICreateReservation } from '@models/interfaces';

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
      description,
      slot
    };

    this._reservationS.createReservation$(createReservation).subscribe(() => {
      this.isCreatingSig.set(false);
      this._dialogRef.close();
    });
  }
}
