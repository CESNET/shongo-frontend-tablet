import { ILocale } from './locale.interface';

export const I18N_CS: ILocale = {
  ['NOW_HAPPENING:ROOM_AVAILABLE']: 'Místnost je volná',
  ['NOW_HAPPENING:ROOM_OCCUPIED']: 'Místnost je obsazená',
  ['NOW_HAPPENING:MEETING_END_IN']: 'Schůzka končí {PARAM}',
  ['NOW_HAPPENING:NEXT_MEETING_IN']: 'Další schůzka {PARAM}',
  ['NOW_HAPPENING:NO_MORE_MEETINGS']: 'Žádné další schůzky',
  ['NOW_HAPPENING:BOOK_NOW']: 'Rezervovat nyní',
  ['HEADER:RESERVE']: 'Rezervovat',
  ['HEADER:BACK']: 'Zpět',
  ['HEADER:TODAY']: 'Dnes',
  ['CREATE_RESERVATION:TITLE']: 'Vytvořit rezervaci',
  ['CREATE_RESERVATION:DESCRIPTION']: 'Popis',
  ['CREATE_RESERVATION:SELECTED_SLOT']: 'Vybraný slot:',
  ['CREATE_RESERVATION:CANCEL']: 'Zrušit',
  ['CREATE_RESERVATION:CREATE']: 'Vytvořit',
  ['CREATE_RESERVATION:ERROR:REQUIRED']: 'Povinné pole',
  ['CREATE_RESERVATION:ERROR:MAX_LENGTH']: 'Popis může mít maximálně 150 znaků',
  ['TOKEN_MODAL:TITLE']: 'Zadejte autentizační údaje pro toto zařízení',
  ['TOKEN_MODAL:TOKEN']: 'Autentizační token',
  ['TOKEN_MODAL:ERROR:REQUIRED']: 'Token je povinný',
  ['TOKEN_MODAL:ERROR:INVALID']: 'Token je neplatný',
  ['TOKEN_MODAL:SAVE']: 'Uložit',
  ['NOTIFICATION:RESERVATION_CREATED']: 'Rezervace vytvořena',
  ['NOTIFICATION:RESERVATION_ERROR']: 'Chyba při vytváření rezervace',
  ['NOTIFICATION:FETCH_RESERVATIONS_ERROR']: 'Chyba při načítání rezervací'
};
