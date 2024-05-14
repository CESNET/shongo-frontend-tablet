import { Injectable, computed, signal } from '@angular/core';
import { DEFAULT_LOCALE } from '@app/models/constants';
import { ILocaleItem } from '@app/models/interfaces';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  selectedLocaleSig = signal<ILocaleItem>(DEFAULT_LOCALE);
  selectedLocaleValueSig = computed(() => this.selectedLocaleSig().value);

  constructor() {
    moment.locale(DEFAULT_LOCALE.value);
  }

  selectLocale(locale: ILocaleItem): void {
    this.selectedLocaleSig.set(locale);
    moment.locale(locale.value);
  }
}
