import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  showHappeningToday = true;

  constructor(
    registry: MatIconRegistry,
    domSanitizer: DomSanitizer,
    public authS: AuthenticationService
  ) {
    registry.addSvgIcon('flag-en', domSanitizer.bypassSecurityTrustResourceUrl('assets/img/i18n/GB.svg'));
    registry.addSvgIcon('flag-cz', domSanitizer.bypassSecurityTrustResourceUrl('assets/img/i18n/CZ.svg'));
  }

  ngOnInit(): void {
    if (!this.authS.isAuthenticated) {
      this.authS.openTokenModal();
    } else {
      this.authS.checkAuthentication$().subscribe();
    }
  }
}
