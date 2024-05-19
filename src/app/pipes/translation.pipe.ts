import { Pipe, PipeTransform } from '@angular/core';
import { ILocale } from '@app/i18n/locale.interface';
import { I18N_MAP } from '@app/i18n/locales.const';
import { PARAM_KEY } from '@app/i18n/param.const';
import { ELocale } from '@app/models/enums/locale.enum';

@Pipe({
  name: 'translate'
})
export class TranslationPipe implements PipeTransform {
  transform(key: keyof ILocale, locale: ELocale, ...params: (string | number)[]): string {
    const translations = I18N_MAP.get(locale)!;
    let translation = translations[key];

    params.forEach((param) => {
      translation = translation.replace(PARAM_KEY, param.toString());
    });

    return translation;
  }
}
