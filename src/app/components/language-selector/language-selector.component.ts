import { Component } from '@angular/core';
import { locales } from './locales.const';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html'
})
export class LanguageSelectorComponent {
  readonly locales = locales;

  onSelectLocale(locale: string): void {
    console.log('Selected locale:', locale);
  }
}
