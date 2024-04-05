import { Injectable } from '@angular/core';
import { ICreateReservation, IReservationRequest } from '@models/interfaces';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(private _apiS: ApiService) {}

  createReservation$(body: ICreateReservation): Observable<IReservationRequest> {
    return this._apiS.post<IReservationRequest>('/api/v1/reservation_requests', body);
  }

  fetchReservations$(): Observable<IReservationRequest> {
    return this._apiS.get<IReservationRequest>('/api/v1/reservation_requests');
  }
}
