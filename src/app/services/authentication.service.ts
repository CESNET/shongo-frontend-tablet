import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDeviceData } from '@app/models/interfaces';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModalHelperService } from './modal-helper.service';

const DEVICE_TOKEN_STORAGE_KEY = 'shongo-device-token';
const DEVICE_RESOURCE_STORAGE_KEY = 'shongo-device-resource';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private _http: HttpClient,
    private _modalHelperS: ModalHelperService
  ) {}

  get isAuthenticated(): boolean {
    return !!this.deviceToken;
  }

  get authHeader(): string {
    return `Bearer ${this.deviceToken}`;
  }

  get deviceToken(): string | null {
    return localStorage.getItem(DEVICE_TOKEN_STORAGE_KEY);
  }

  get deviceResource(): string | null {
    return localStorage.getItem(DEVICE_RESOURCE_STORAGE_KEY);
  }

  clearAuthentication(): void {
    localStorage.removeItem(DEVICE_TOKEN_STORAGE_KEY);
    localStorage.removeItem(DEVICE_RESOURCE_STORAGE_KEY);
  }

  initializeAuthentication$(token: string): Observable<IDeviceData> {
    localStorage.setItem(DEVICE_TOKEN_STORAGE_KEY, token);

    return this._fetchDeviceData$().pipe(
      tap(({ resourceId }) => {
        localStorage.setItem(DEVICE_RESOURCE_STORAGE_KEY, resourceId);
      })
    );
  }

  checkAuthentication$(): Observable<IDeviceData> {
    return this.initializeAuthentication$(this.deviceToken!).pipe(
      catchError(() => {
        this.clearAuthentication();
        this.openTokenModal();
        return EMPTY;
      })
    );
  }

  openTokenModal(): void {
    this._modalHelperS.openTokenModal();
  }

  private _fetchDeviceData$(): Observable<IDeviceData> {
    return this._http.get<IDeviceData>(`${environment.baseHref}/api/v1/reservation_device`, {
      headers: {
        Authorization: this.authHeader
      }
    });
  }
}
