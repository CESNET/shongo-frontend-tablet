import { ShongoCalendarModule } from '@CESNET/shongo-calendar';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MOMENT } from 'angular-calendar';
import moment from 'moment';
import { AppComponent } from './app.component';
import { CalendarHeaderComponent } from './components/calendar-header/calendar-header.component';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [AppComponent, CalendarHeaderComponent, CalendarComponent],
  imports: [BrowserModule, ShongoCalendarModule.forRoot(), BrowserAnimationsModule, MatToolbarModule],
  providers: [
    {
      provide: MOMENT,
      useValue: moment
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
