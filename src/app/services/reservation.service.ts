import { ICalendarItem, IInterval } from '@CESNET/shongo-calendar';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse } from '@app/models/interfaces/api-response.interface';
import { ERequestState } from '@models/enums';
import { ICreateReservation, IRequest, IReservationRequest } from '@models/interfaces';
import moment from 'moment';
import { BehaviorSubject, Observable, catchError, first, map } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(private _apiS: ApiService) {}

  createReservation$(body: ICreateReservation): Observable<IReservationRequest> {
    return this._apiS.post<IReservationRequest>('/api/v1/reservation_requests', body);
  }

  fetchInterval$(interval: IInterval): Observable<IRequest<ICalendarItem[]>> {
    const filter = new HttpParams()
      .set('interval_from', moment(interval.start).toISOString())
      .set('interval_to', moment(interval.end).toISOString());

    return this._fetchInterval$(filter);
  }

  private _fetchInterval$(params: HttpParams): Observable<IRequest<ICalendarItem[]>> {
    const response$ = new BehaviorSubject<IRequest<ICalendarItem[]>>({
      data: [],
      state: ERequestState.LOADING
    });

    this._apiS
      .get<IApiResponse<IReservationRequest>>('/api/v1/reservation_requests', { params })
      .pipe(
        first(),
        map((reservations) => reservations.items.map((res) => this._createCalendarItem(res))),
        catchError((err) => {
          console.error(err);
          // TODO: Add alert
          return [];
        })
      )
      .subscribe((reservations) => {
        response$.next({ data: reservations, state: ERequestState.SUCCESS });
        response$.complete();
      });

    return response$.asObservable();
  }

  private _createCalendarItem(reservation: IReservationRequest): ICalendarItem {
    const item: ICalendarItem = {
      slot: {
        start: moment(reservation.slot.start).toDate(),
        end: moment(reservation.slot.end).toDate()
      },
      owner: {
        name: reservation.ownerName,
        email: reservation.ownerEmail
      },
      title: reservation.description,
      data: {
        reservation
      }
    };

    return item;
  }
}
