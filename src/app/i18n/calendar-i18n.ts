import { Injectable } from '@angular/core';
import { ELocale } from '@app/models/enums';
import { I18nService } from '@app/services';
import { ICalendarI18n, ICalendarTranslations } from '@cesnet/shongo-calendar';

@Injectable()
export class TabletCalendarI18n implements ICalendarI18n {
  constructor(private _i18nS: I18nService) {}

  getTranslations(): ICalendarTranslations | undefined {
    const lang = this._i18nS.selectedLocaleValueSig();

    if (lang === ELocale.CS) {
      return {
        tooltipDescription: 'Popis',
        tooltipTimeSlot: 'Časový slot',
        tooltipReservedBy: 'Rezervováno uživatelem',
        unknown: 'Neznámé',
        reservationFor: 'Rezervace na',
        tooltipResource: 'Zdroj'
      };
    }
    return undefined;
  }
}
