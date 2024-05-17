import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse } from '@app/models/interfaces/api-response.interface';
import { TranslationPipe } from '@app/pipes/translation.pipe';
import { ICalendarItem, IInterval } from '@cesnet/shongo-calendar';
import { ERequestState } from '@models/enums';
import { IRequest, IReservationRequest } from '@models/interfaces';
import moment from 'moment';
import { BehaviorSubject, EMPTY, Observable, catchError, first, iif, map, of, switchMap } from 'rxjs';
import { ApiService } from './api.service';
import { AuthenticationService } from './authentication.service';
import { I18nService } from './i18n.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(
    private _apiS: ApiService,
    private _notificationS: NotificationService,
    private _authS: AuthenticationService,
    private _i18nS: I18nService,
    private _translationP: TranslationPipe
  ) {}

  createReservation$(slot: IInterval, description: string): Observable<{ id: string }> {
    const resourceId$ = iif(
      () => !!this._authS.deviceResource,
      of(this._authS.deviceResource),
      this._authS.checkAuthentication$().pipe(map((data) => data.resourceId))
    );

    return resourceId$.pipe(
      map((resourceId) => ({
        resource: resourceId,
        description,
        slot,
        periodicity: {
          type: 'NONE'
        },
        type: 'PHYSICAL_RESOURCE'
      })),
      switchMap((body) => {
        return this._apiS.post<IReservationRequest>('/api/v1/reservation_requests', body);
      })
    );
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
          this._notificationS.error(
            this._translationP.transform('NOTIFICATION:FETCH_RESERVATIONS_ERROR', this._i18nS.selectedLocaleValueSig())
          );
          response$.next({ data: [], state: ERequestState.ERROR });
          response$.complete();
          return EMPTY;
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
