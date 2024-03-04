import { ShongoCalendarModule } from '@CESNET/shongo-calendar';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MOMENT } from 'angular-calendar';
import moment from 'moment';
import { AppComponent } from './app.component';
import { CalendarHeaderComponent, DateSelectorComponent, LanguageSelectorComponent } from './components';
import { CalendarComponent } from './pages';

@NgModule({
  declarations: [
    AppComponent,
    CalendarHeaderComponent,
    CalendarComponent,
    DateSelectorComponent,
    LanguageSelectorComponent
  ],
  imports: [
    BrowserModule,
    ShongoCalendarModule.forRoot(),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatMenuModule,
    HammerModule
  ],
  providers: [
    {
      provide: MOMENT,
      useValue: moment
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
