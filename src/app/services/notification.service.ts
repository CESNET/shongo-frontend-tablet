import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

const DEFUALT_OPTIONS = {
  timeOut: 3000
};

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private _toastrS: ToastrService) {}

  error(message: string): void {
    this._toastrS.error(message, undefined, DEFUALT_OPTIONS);
  }

  success(message: string): void {
    this._toastrS.success(message, undefined, DEFUALT_OPTIONS);
  }
}
