import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.scss']
})
export class CreateReservationComponent {
  readonly form = this._fb.group({
    description: ['', Validators.required]
  });

  constructor(private _fb: FormBuilder) {}
}
