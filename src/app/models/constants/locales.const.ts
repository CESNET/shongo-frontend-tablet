import { ELocale } from '@models/enums/locale.enum';
import { ILocaleItem } from '@models/interfaces/locale-item.interface';

/**
 * Items in locale selection.
 */
export const LOCALES: ILocaleItem[] = [
  {
    value: ELocale.EN,
    icon: 'flag-en',
    name: 'English'
  },
  {
    value: ELocale.CS,
    icon: 'flag-cz',
    name: 'Česky'
  }
];

export const DEFAULT_LOCALE = LOCALES.find((locale) => locale.value === ELocale.CS)!;
