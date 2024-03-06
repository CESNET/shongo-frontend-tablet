import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MOMENT } from 'angular-calendar';
import moment from 'moment';
import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';

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
