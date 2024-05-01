import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationPageComponent } from './pages';
import { HappeningTodayPageComponent } from './pages/happening-today-page/happening-today-page.component';

const routes: Routes = [
  { path: '', component: HappeningTodayPageComponent },
  { path: 'reserve', component: ReservationPageComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
