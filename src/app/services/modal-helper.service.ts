import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateReservationComponent, TokenModalComponent } from '@app/components';
import { IInterval } from '@cesnet/shongo-calendar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalHelperService {
  constructor(private _dialog: MatDialog) {}

  openCreateReservation$(slot: IInterval): Observable<unknown> {
    const dialogRef = this._dialog.open<CreateReservationComponent>(CreateReservationComponent, {
      width: '30rem',
      data: {
        slot
      }
    });

    return dialogRef.afterClosed();
  }

  openTokenModal(): void {
    this._dialog.open(TokenModalComponent, { disableClose: true, width: '40%' });
  }
}
