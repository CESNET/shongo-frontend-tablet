import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(registry: MatIconRegistry, domSanitizer: DomSanitizer) {
    registry.addSvgIcon('flag-en', domSanitizer.bypassSecurityTrustResourceUrl('assets/img/i18n/GB.svg'));
    registry.addSvgIcon('flag-cz', domSanitizer.bypassSecurityTrustResourceUrl('assets/img/i18n/CZ.svg'));
  }
}
