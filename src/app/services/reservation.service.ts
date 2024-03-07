import { Injectable } from '@angular/core';
import { ICreateReservation } from '@app/models/interfaces';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  createReservation$(body: ICreateReservation): Observable<unknown> {
    return of(body).pipe(delay(3000));
  }
}
