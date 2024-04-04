import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TokenModalComponent } from './components';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    registry: MatIconRegistry,
    domSanitizer: DomSanitizer,
    private _matDialog: MatDialog,
    private _authS: AuthenticationService
  ) {
    registry.addSvgIcon('flag-en', domSanitizer.bypassSecurityTrustResourceUrl('assets/img/i18n/GB.svg'));
    registry.addSvgIcon('flag-cz', domSanitizer.bypassSecurityTrustResourceUrl('assets/img/i18n/CZ.svg'));
  }

  ngOnInit(): void {
    !this._authS.isAuthenticated && this._matDialog.open(TokenModalComponent, { disableClose: true, width: '40%' });
  }
}
