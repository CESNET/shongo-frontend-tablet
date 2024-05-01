import { Component } from '@angular/core';
import { HappeningTodayService } from '@app/services/happening-today.service';

@Component({
  selector: 'app-happening-today-page',
  templateUrl: './happening-today-page.component.html',
  styleUrls: ['./happening-today-page.component.scss']
})
export class HappeningTodayPageComponent {
  constructor(public happeningTodayS: HappeningTodayService) {}
}
