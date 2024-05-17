import { CommonModule, registerLocaleData } from '@angular/common';
import cs from '@angular/common/locales/cs';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { TabletCalendarI18n } from '@app/i18n/calendar-i18n';
import { SHONGO_CALENDAR_DYNAMIC_I18N } from '@cesnet/shongo-calendar';
import { MOMENT } from 'angular-calendar';
import moment from 'moment';
import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';

registerLocaleData(cs);

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: MOMENT,
      useValue: moment
    },
    {
      provide: SHONGO_CALENDAR_DYNAMIC_I18N,
      useClass: TabletCalendarI18n
    }
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
