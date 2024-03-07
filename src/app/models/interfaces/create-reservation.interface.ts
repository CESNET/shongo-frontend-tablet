import { IInterval } from '@CESNET/shongo-calendar';

export interface ICreateReservation {
  description: string;
  slot: IInterval;
}
