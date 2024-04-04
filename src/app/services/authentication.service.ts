import { Injectable } from '@angular/core';

const DEVICE_TOKEN_STORAGE_KEY = 'shongo-device-token';
const DEVICE_RESOURCE_STORAGE_KEY = 'shongo-device-resource';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
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

  setAuthData(token: string, resource: string): void {
    localStorage.setItem(DEVICE_TOKEN_STORAGE_KEY, token);
    localStorage.setItem(DEVICE_RESOURCE_STORAGE_KEY, resource);
  }
}
