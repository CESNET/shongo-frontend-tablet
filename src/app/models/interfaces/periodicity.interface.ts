import { EDays } from '../enums/days.enum';
import { EMonthlyPeriodicityType, EPeriodicityType } from '../enums/periodicity-type.enum';

export interface IPeriodicity {
  type: EPeriodicityType;
  monthlyPeriodicityType?: EMonthlyPeriodicityType;
  periodicDayInMonth?: EDays;
  periodicityDayOrder?: number;
  periodicityEnd?: string;
  periodicDaysInWeek?: EDays[];
  periodicityCycle?: number;
  excludeDates?: string[];
}
