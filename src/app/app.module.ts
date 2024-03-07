import { ShongoCalendarModule } from '@CESNET/shongo-calendar';
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
import { CoreModule } from 'src/core/core.module';
import { AppComponent } from './app.component';
import {
  CalendarHeaderComponent,
  CreateReservationComponent,
  DateSelectorComponent,
  LanguageSelectorComponent,
  LoadingOverlayComponent
} from './components';
import { CalendarComponent } from './pages';

@NgModule({
  declarations: [
    AppComponent,
    CalendarHeaderComponent,
    CalendarComponent,
    DateSelectorComponent,
    LanguageSelectorComponent,
    CreateReservationComponent,
    LoadingOverlayComponent
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
    MatProgressSpinnerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
