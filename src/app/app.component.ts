import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    registry: MatIconRegistry,
    domSanitizer: DomSanitizer,
    private _authS: AuthenticationService
  ) {
    registry.addSvgIcon('flag-en', domSanitizer.bypassSecurityTrustResourceUrl('assets/img/i18n/GB.svg'));
    registry.addSvgIcon('flag-cz', domSanitizer.bypassSecurityTrustResourceUrl('assets/img/i18n/CZ.svg'));
  }

  ngOnInit(): void {
    if (!this._authS.isAuthenticated) {
      this._authS.openTokenModal();
    } else {
      this._authS.checkAuthentication$().subscribe();
    }
  }
}
