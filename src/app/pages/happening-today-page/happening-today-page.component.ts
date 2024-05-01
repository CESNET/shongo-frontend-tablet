import { Component, signal } from '@angular/core';

const SECOND_INTERVAL = 1000;

@Component({
  selector: 'app-happening-today-page',
  templateUrl: './happening-today-page.component.html',
  styleUrls: ['./happening-today-page.component.scss']
})
export class HappeningTodayPageComponent {
  readonly todaySig = signal(new Date());

  constructor() {
    setInterval(() => this.todaySig.set(new Date()), SECOND_INTERVAL);
  }
}
