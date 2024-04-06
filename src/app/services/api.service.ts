import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationError } from '@app/models/errors';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private _http: HttpClient,
    private _authS: AuthenticationService
  ) {}

  get<T>(url: string, options?: Record<string, unknown>): Observable<T> {
    this._checkAuthentication();

    return this._http.get<T>(url, {
      ...options,
      headers: this._getHeaders()
    });
  }

  post<T>(url: string, body: unknown, options?: Record<string, unknown>): Observable<T> {
    this._checkAuthentication();

    return this._http.post<T>(url, body, {
      ...options,
      headers: this._getHeaders()
    });
  }

  private _getHeaders(): Record<string, string> {
    return {
      Authorization: this._authS.authHeader
    };
  }

  private _checkAuthentication(): void {
    if (!this._authS.isAuthenticated) {
      this._authS.openTokenModal();
      throw new AuthenticationError();
    }
  }
}
