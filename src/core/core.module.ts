import { CommonModule, registerLocaleData } from '@angular/common';
import cs from '@angular/common/locales/cs';
import { NgModule, Optional, SkipSelf } from '@angular/core';
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
    }
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
