import { DestroyRef, Injectable, computed, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ICalendarItem, IInterval } from '@cesnet/shongo-calendar';
import { ERequestState } from '@models/enums';
import moment from 'moment';
import { Observable, filter, first, interval, map, startWith, switchMap } from 'rxjs';
import { ReservationService } from './reservation.service';

const SECOND_INTERVAL = 1000;
const UPDATE_INTERVAL = SECOND_INTERVAL * 60 * 5;

@Injectable()
export class HappeningTodayService {
  readonly todaySig = signal(new Date());
  readonly upcomingMeetingsSig = signal<ICalendarItem[]>([]);
  readonly isAvailableSig = computed(() => this._isAvailable(this.upcomingMeetingsSig(), this.todaySig()));
  readonly nextMeetingSig = computed(() => this._getNextMeeting(this.upcomingMeetingsSig(), this.todaySig()));
  readonly timeToNextMeetingSig = computed(() => this._timeToNextMeeting(this.nextMeetingSig()));
  readonly currentMeetingSig = computed(() => this._getCurrentMeeting(this.upcomingMeetingsSig(), this.todaySig()));
  readonly timeToCurrentMeetingEndSig = computed(() => this._timeToCurrentMeetingEnd(this.currentMeetingSig()));

  constructor(
    private _reservationS: ReservationService,
    private _destroyRef: DestroyRef
  ) {
    this._keepUpdatingToday();
    this._keepUpcomingMeetingsUpdated();
  }

  private _keepUpcomingMeetingsUpdated(): void {
    interval(UPDATE_INTERVAL)
      .pipe(
        startWith(0),
        switchMap(() => this._fetchUpcomingMeetings$()),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe((meetings) => this.upcomingMeetingsSig.set(meetings));
  }

  private _keepUpdatingToday(): void {
    interval(SECOND_INTERVAL)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => this.todaySig.set(new Date()));
  }

  private _fetchUpcomingMeetings$(): Observable<ICalendarItem[]> {
    const now = this.todaySig();
    const endOfToday = moment(now).endOf('day').toDate();

    return this._reservationS.fetchInterval$({ start: now, end: endOfToday }).pipe(
      filter((res) => res.state !== ERequestState.LOADING),
      first(),
      map(({ data }) => data.sort((a, b) => a.slot.start.getTime() - b.slot.start.getTime()))
    );
  }

  private _isAvailable(meetings: ICalendarItem[], now: Date): boolean {
    return !meetings.some((meeting) => this._isWithinInterval(now, meeting.slot));
  }

  private _timeToNextMeeting(nextMeeting: ICalendarItem | null): string | null {
    if (!nextMeeting) {
      return null;
    }
    return this._formatDistanceFromNow(nextMeeting.slot.start);
  }

  private _getNextMeeting(meetings: ICalendarItem[], now: Date): ICalendarItem | null {
    return meetings.find((meeting) => meeting.slot.start > now) || null;
  }

  private _getCurrentMeeting(meetings: ICalendarItem[], now: Date): ICalendarItem | null {
    return meetings.find((meeting) => this._isWithinInterval(now, meeting.slot)) || null;
  }

  private _timeToCurrentMeetingEnd(currentMeeting: ICalendarItem | null): string | null {
    if (!currentMeeting) {
      return null;
    }
    return this._formatDistanceFromNow(currentMeeting.slot.end);
  }

  private _isWithinInterval(date: Date, interval: IInterval): boolean {
    const now = moment(date);
    const start = moment(interval.start);
    const end = moment(interval.end);

    return now.isBetween(start, end);
  }

  private _formatDistanceFromNow(end: Date): string {
    return moment(end).fromNow();
  }
}
