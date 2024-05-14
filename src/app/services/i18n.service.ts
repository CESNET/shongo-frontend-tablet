import { Injectable, computed, signal } from '@angular/core';
import { DEFAULT_LOCALE } from '@app/models/constants';
import { ILocaleItem } from '@app/models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  selectedLocaleSig = signal<ILocaleItem>(DEFAULT_LOCALE);
  selectedLocaleValueSig = computed(() => this.selectedLocaleSig().value);

  selectLocale(locale: ILocaleItem): void {
    this.selectedLocaleSig.set(locale);
  }
}
