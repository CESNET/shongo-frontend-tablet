import { EDays, EMonthlyPeriodicityType, EPeriodicityType } from '../enums';

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
