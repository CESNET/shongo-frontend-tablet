import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDeviceData } from '@app/models/interfaces';
import { Observable, tap } from 'rxjs';

const DEVICE_TOKEN_STORAGE_KEY = 'shongo-device-token';
const DEVICE_RESOURCE_STORAGE_KEY = 'shongo-device-resource';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private _http: HttpClient) {}

  get isAuthenticated(): boolean {
    return !!this.deviceToken && !!this.deviceResource;
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

  saveAuthData$(token: string): Observable<IDeviceData> {
    localStorage.setItem(DEVICE_TOKEN_STORAGE_KEY, token);

    return this.fetchDeviceData$().pipe(
      tap(({ resourceId }) => {
        localStorage.setItem(DEVICE_RESOURCE_STORAGE_KEY, resourceId);
      })
    );
  }

  fetchDeviceData$(): Observable<IDeviceData> {
    return this._http.get<IDeviceData>('/api/v1/reservation_device', {
      headers: {
        Authorization: this.authHeader
      }
    });
  }
}
