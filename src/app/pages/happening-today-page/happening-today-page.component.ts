import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslationPipe } from '@app/pipes/translation.pipe';
import { HappeningTodayService } from '@app/services/happening-today.service';
import { I18nService } from '@app/services/i18n.service';

@Component({
  selector: 'app-happening-today-page',
  templateUrl: './happening-today-page.component.html',
  styleUrls: ['./happening-today-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    public i18nS: I18nService,
    private _translationP: TranslationPipe
  ) {}

  getMoreEventsText(eventCount: number): string | null {
    const moreEventsCount = eventCount - this.UPCOMING_EVENTS_LIMIT;

    if (moreEventsCount <= 0) {
      return null;
    }

    const key = moreEventsCount > 1 ? 'NOW_HAPPENING:MORE_EVENTS' : 'NOW_HAPPENING:ONE_MORE_EVENT';

    return this._translationP.transform(key, this.i18nS.selectedLocaleValueSig(), moreEventsCount);
  }
}
