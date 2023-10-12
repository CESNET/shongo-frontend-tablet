import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ShongoCalendarModule } from '@CESNET/shongo-calendar';
import { MOMENT } from 'angular-calendar';
import moment from 'moment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarHeaderComponent } from './components/calendar-header/calendar-header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [AppComponent, CalendarHeaderComponent, CalendarComponent],
  imports: [
    BrowserModule,
    ShongoCalendarModule.forRoot(),
    BrowserAnimationsModule,
    MatToolbarModule,
  ],
  providers: [
    {
      provide: MOMENT,
      useValue: moment,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
