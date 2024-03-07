import { Component, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ICreateReservation } from '@app/models/interfaces';
import { ReservationService } from '@app/services/reservation.service';

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
    private _modalRef: MatDialogRef<CreateReservationComponent>
  ) {}

  onCreate(): void {
    this.isCreatingSig.set(true);
    this._reservationS.createReservation$(this.form.value as ICreateReservation).subscribe(() => {
      this.isCreatingSig.set(false);
      this._modalRef.close();
    });
  }
}
