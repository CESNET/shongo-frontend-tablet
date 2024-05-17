import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { I18nService } from '@app/services';
import { HappeningTodayService } from '@app/services/happening-today.service';

@Component({
  selector: 'app-happening-today-page',
  templateUrl: './happening-today-page.component.html',
  styleUrls: ['./happening-today-page.component.scss'],
  providers: [HappeningTodayService],
  animations: [
    trigger('fadeInOut', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateX(-20px)' }),
            stagger(150, [animate(200, style({ opacity: 1, transform: 'translateX(0)' }))])
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class HappeningTodayPageComponent {
  readonly UPCOMING_EVENTS_LIMIT = 4;

  constructor(
    public happeningTodayS: HappeningTodayService,
    public i18nS: I18nService
  ) {}

  getMoreEventsText(eventCount: number): string {
    const moreEventsCount = eventCount - this.UPCOMING_EVENTS_LIMIT;

    if (moreEventsCount <= 0) {
      return '';
    }

    return `+${moreEventsCount} more event${moreEventsCount > 1 ? 's' : ''} today`;
  }
}
