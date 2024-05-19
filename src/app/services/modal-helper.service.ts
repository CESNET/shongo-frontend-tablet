import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateReservationModalComponent } from '@app/components/create-reservation-modal/create-reservation-modal.component';
import { TokenModalComponent } from '@app/components/token-modal/token-modal.component';
import { IInterval } from '@cesnet/shongo-calendar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalHelperService {
  constructor(private _dialog: MatDialog) {}

  openCreateReservation$(slot: IInterval): Observable<unknown> {
    const dialogRef = this._dialog.open<CreateReservationModalComponent>(CreateReservationModalComponent, {
      width: '50%',
      data: {
        slot
      },
      position: {
        top: '10%'
      }
    });

    return dialogRef.afterClosed();
  }

  openTokenModal(): void {
    this._dialog.closeAll();
    this._dialog.open(TokenModalComponent, { disableClose: true, width: '50%', position: { top: '10%' } });
  }
}
