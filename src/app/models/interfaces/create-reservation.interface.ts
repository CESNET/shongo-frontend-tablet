import { IInterval } from '@CESNET/shongo-calendar';

export interface ICreateReservation {
  description: string;
  slot: IInterval;
  resource: string;
  periodicity: {
    type: 'NONE';
  };
  type: 'PHYSICAL_RESOURCE';
}
