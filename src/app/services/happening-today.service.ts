import { Injectable, computed, signal } from '@angular/core';
import { ICalendarItem } from '@cesnet/shongo-calendar';
import { ERequestState } from '@models/enums';
import { endOfDay, formatDistance, isWithinInterval } from 'date-fns';
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
  readonly timeToNextMeetingSig = computed(() => this._timeToNextMeeting(this.nextMeetingSig(), this.todaySig()));
  readonly currentMeetingSig = computed(() => this._getCurrentMeeting(this.upcomingMeetingsSig(), this.todaySig()));
  readonly timeToCurrentMeetingEndSig = computed(() =>
    this._timeToCurrentMeetingEnd(this.currentMeetingSig(), this.todaySig())
  );

  constructor(private _reservationS: ReservationService) {
    this._keepUpdatingToday();
    this._keepUpcomingMeetingsUpdated();
  }

  private _keepUpcomingMeetingsUpdated(): void {
    interval(UPDATE_INTERVAL)
      .pipe(
        startWith(0),
        switchMap(() => this._fetchUpcomingMeetings$())
      )
      .subscribe((meetings) => this.upcomingMeetingsSig.set(meetings));
  }

  private _keepUpdatingToday(): void {
    interval(SECOND_INTERVAL).subscribe(() => this.todaySig.set(new Date()));
  }

  private _fetchUpcomingMeetings$(): Observable<ICalendarItem[]> {
    const now = this.todaySig();
    const endOfToday = endOfDay(now);

    return this._reservationS.fetchInterval$({ start: now, end: endOfToday }).pipe(
      filter((res) => res.state !== ERequestState.LOADING),
      first(),
      map(({ data }) => data.sort((a, b) => a.slot.start.getTime() - b.slot.start.getTime()))
    );
  }

  private _isAvailable(meetings: ICalendarItem[], now: Date): boolean {
    return !meetings.some((meeting) => isWithinInterval(now, meeting.slot));
  }

  private _timeToNextMeeting(nextMeeting: ICalendarItem | null, now: Date): string | null {
    if (!nextMeeting) {
      return null;
    }
    return formatDistance(now, nextMeeting.slot.start);
  }

  private _getNextMeeting(meetings: ICalendarItem[], now: Date): ICalendarItem | null {
    return meetings.find((meeting) => meeting.slot.start > now) || null;
  }

  private _getCurrentMeeting(meetings: ICalendarItem[], now: Date): ICalendarItem | null {
    return meetings.find((meeting) => isWithinInterval(now, meeting.slot)) || null;
  }

  private _timeToCurrentMeetingEnd(currentMeeting: ICalendarItem | null, now: Date): string | null {
    if (!currentMeeting) {
      return null;
    }
    return formatDistance(now, currentMeeting.slot.end);
  }
}
