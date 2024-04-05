import { EReservationRequestState, EReservationType } from '../enums';
import { ERoomState } from '../enums/room-state.enum';
import { ETechnology } from '../enums/technology.enum';
import { IPeriodicity } from './periodicity.interface';
import { ISlot } from './slot.interface';

export interface IReservationRequest {
  id: string;
  description: string;
  createdAt: string;
  parentRequestId?: string;
  lastReservationId?: string;
  state: EReservationRequestState;
  isWritable: boolean;
  isProvidable: boolean;
  ownerName: string;
  ownerEmail: string;
  slot: ISlot;
  futureSlotCount?: number;
  isDeprecated: boolean;
  type: EReservationType;
  virtualRoomData?: IVirtualRoomData;
  physicalResourceData?: IPhysicalResourceData;
  roomCapacityData?: IRoomCapacityData;
}

export interface IVirtualRoomData {
  roomResourceId: string;
  state: ERoomState;
  technology: ETechnology;
  roomName: string;
  roomHasRecordings: boolean;
}

export interface IPhysicalResourceData {
  resourceId: string;
  resourceName: string;
  resourceDescription: string;
  periodicity: IPeriodicity;
}

export interface IRoomCapacityData {
  roomReservationRequestId: string;
  capacityParticipantCount: number;
  capacityHasRecordingService: boolean;
  capacityHasRecordings: boolean;
  isRecordingActive: boolean;
  periodicity: IPeriodicity;
}
