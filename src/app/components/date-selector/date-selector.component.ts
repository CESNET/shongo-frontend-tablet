import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CalendarService, I18nService } from '@app/services';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'div[app-date-selector]',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateSelectorComponent implements AfterViewInit {
  @ViewChild('nextButton', { static: true, read: ElementRef }) nextButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('previousButton', { static: true, read: ElementRef }) previousButton!: ElementRef<HTMLButtonElement>;

  readonly CalendarView = CalendarView;

  constructor(
    public calendarS: CalendarService,
    public i18nS: I18nService,
    private _destroyRef: DestroyRef
  ) {}

  ngAfterViewInit(): void {
    this.calendarS.nextView$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => this.nextButton.nativeElement.click());
    this.calendarS.previousView$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => this.previousButton.nativeElement.click());
  }

  onViewDateChange(date: Date): void {
    this.calendarS.setViewDate(date);
  }

  onBackToMonth(): void {
    this.calendarS.setView(CalendarView.Month);
  }
}
