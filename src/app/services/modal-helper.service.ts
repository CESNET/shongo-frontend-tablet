import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateReservationComponent } from '@app/components';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalHelperService {
  constructor(private _dialog: MatDialog) {}

  openCreateReservation$(): Observable<unknown> {
    const dialogRef = this._dialog.open<CreateReservationComponent>(CreateReservationComponent, {
      width: '30rem'
    });

    return dialogRef.afterClosed();
  }
}
