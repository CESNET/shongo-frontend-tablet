import { ELocale } from '@models/enums';
import { ILocaleItem } from '@models/interfaces';

/**
 * Items in locale selection.
 */
export const locales: ILocaleItem[] = [
  {
    value: ELocale.EN,
    icon: 'flag-en',
    name: 'English'
  },
  {
    value: ELocale.CS,
    icon: 'flag-cz',
    name: 'Czech'
  }
];
