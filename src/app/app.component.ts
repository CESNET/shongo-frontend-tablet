import { Component, HostBinding, NgZone, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { IdleService } from './services/idle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  showHappeningToday = true;

  constructor(
    registry: MatIconRegistry,
    domSanitizer: DomSanitizer,
    idleS: IdleService,
    router: Router,
    zone: NgZone,
    public authS: AuthenticationService
  ) {
    registry.addSvgIcon('flag-en', domSanitizer.bypassSecurityTrustResourceUrl('assets/img/i18n/GB.svg'));
    registry.addSvgIcon('flag-cz', domSanitizer.bypassSecurityTrustResourceUrl('assets/img/i18n/CZ.svg'));

    idleS.idle$.subscribe(() => zone.run(() => void router.navigate(['/'])));
  }

  @HostBinding('document:contextmenu')
  onContextMenu(event: MouseEvent): boolean {
    event.preventDefault();
    return false;
  }

  ngOnInit(): void {
    if (!this.authS.isAuthenticated) {
      this.authS.openTokenModal();
    } else {
      this.authS.checkAuthentication$().subscribe();
    }
  }
}
