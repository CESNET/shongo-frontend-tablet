import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShongoCalendarModule } from '@cesnet/shongo-calendar';
import { ToastrModule } from 'ngx-toastr';
import { CoreModule } from 'src/core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarHeaderComponent } from './components/calendar-header/calendar-header.component';
import { CreateReservationModalComponent } from './components/create-reservation-modal/create-reservation-modal.component';
import { DateSelectorComponent } from './components/date-selector/date-selector.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { TokenModalComponent } from './components/token-modal/token-modal.component';
import { UpcomingEventComponent } from './components/upcoming-event/upcoming-event.component';
import { HappeningTodayPageComponent } from './pages/happening-today-page/happening-today-page.component';
import { ReservationPageComponent } from './pages/reservation-page/reservation-page.component';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { TranslationPipe } from './pipes/translation.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CalendarHeaderComponent,
    ReservationPageComponent,
    DateSelectorComponent,
    LanguageSelectorComponent,
    CreateReservationModalComponent,
    LoadingOverlayComponent,
    TokenModalComponent,
    HappeningTodayPageComponent,
    UpcomingEventComponent,
    EllipsisPipe,
    TranslationPipe
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
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HammerModule,
    CoreModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [TranslationPipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
