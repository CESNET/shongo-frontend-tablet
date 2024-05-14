import { Component } from '@angular/core';
import { I18nService } from '@app/services/i18n.service';
import { LOCALES } from '@models/constants';
import { ILocaleItem } from '@models/interfaces';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html'
})
export class LanguageSelectorComponent {
  readonly locales = LOCALES;

  constructor(public i18nS: I18nService) {}

  onSelectLocale(locale: ILocaleItem): void {
    this.i18nS.selectLocale(locale);
  }
}
