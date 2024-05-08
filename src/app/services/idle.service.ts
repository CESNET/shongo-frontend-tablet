import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';

const IDLE_DELAY = 1000 * 60 * 5;

@Injectable({
  providedIn: 'root'
})
export class IdleService {
  readonly idle$: Observable<void>;

  private readonly _idle$ = new Subject<void>();

  constructor(private _zone: NgZone) {
    this.idle$ = this._idle$.asObservable();
    this.detectIdle();
  }

  detectIdle(): void {
    this._zone.runOutsideAngular(() => {
      const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll', 'click'];
      let timeout: NodeJS.Timeout;

      const resetTimer = (): void => {
        clearTimeout(timeout);
        timeout = setTimeout(() => this._idle$.next(), IDLE_DELAY);
      };

      events.forEach((event) => document.addEventListener(event, () => resetTimer()));
      resetTimer();
    });
  }
}
