import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-upcoming-event',
  templateUrl: './upcoming-event.component.html',
  styleUrls: ['./upcoming-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpcomingEventComponent {
  @Input({ required: true }) description!: string;
  @Input({ required: true }) start!: Date;
  @Input({ required: true }) end!: Date;
}
