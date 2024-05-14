import { ELocale } from '@app/models/enums';
import { I18N_CS } from './cs.const';
import { I18N_EN } from './en.const';
import { ILocale } from './locale.interface';

export const I18N_MAP = new Map<ELocale, ILocale>([
  [ELocale.CS, I18N_CS],
  [ELocale.EN, I18N_EN]
]);
