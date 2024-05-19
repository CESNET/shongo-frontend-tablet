import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { I18nService } from '@app/services/i18n.service';
import { LOCALES } from '@models/constants/locales.const';
import { ILocaleItem } from '@models/interfaces/locale-item.interface';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSelectorComponent {
  @Input() isFab = false;

  readonly locales = LOCALES;

  constructor(public i18nS: I18nService) {}

  onSelectLocale(locale: ILocaleItem): void {
    this.i18nS.selectLocale(locale);
  }
}
