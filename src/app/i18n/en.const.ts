import { ILocale } from './locale.interface';

export const I18N_EN: ILocale = {
  ['NOW_HAPPENING:ROOM_AVAILABLE']: 'Room Available',
  ['NOW_HAPPENING:ROOM_OCCUPIED']: 'Room Occupied',
  ['NOW_HAPPENING:MEETING_END_IN']: 'Meeting ends {PARAM}',
  ['NOW_HAPPENING:NEXT_MEETING_IN']: 'Next meeting {PARAM}',
  ['NOW_HAPPENING:NO_MORE_MEETINGS']: 'No more meetings today',
  ['NOW_HAPPENING:BOOK_NOW']: 'Book now',
  ['HEADER:RESERVE']: 'Reserve',
  ['HEADER:BACK']: 'Back',
  ['HEADER:TODAY']: 'Today',
  ['CREATE_RESERVATION:TITLE']: 'Create reservation',
  ['CREATE_RESERVATION:DESCRIPTION']: 'Description',
  ['CREATE_RESERVATION:SELECTED_SLOT']: 'Selected slot:',
  ['CREATE_RESERVATION:CANCEL']: 'Cancel',
  ['CREATE_RESERVATION:CREATE']: 'Create',
  ['CREATE_RESERVATION:ERROR:REQUIRED']: 'Input is required',
  ['CREATE_RESERVATION:ERROR:MAX_LENGTH']: 'Description can have max. 150 characters',
  ['TOKEN_MODAL:TITLE']: 'Enter authentication data for this device',
  ['TOKEN_MODAL:TOKEN']: 'Authentization token',
  ['TOKEN_MODAL:ERROR:REQUIRED']: 'Token is required',
  ['TOKEN_MODAL:ERROR:INVALID']: 'Token is invalid',
  ['TOKEN_MODAL:SAVE']: 'Save',
  ['NOTIFICATION:RESERVATION_CREATED']: 'Reservation created',
  ['NOTIFICATION:RESERVATION_ERROR']: 'Failed to create reservation',
  ['NOTIFICATION:FETCH_RESERVATIONS_ERROR']: 'Failed to fetch reservations'
};
