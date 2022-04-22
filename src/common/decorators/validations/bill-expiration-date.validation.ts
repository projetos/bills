import { DateTime } from 'luxon';

export function bankBillExpirationDate(position: string): string {
  const startDate = DateTime.local(2000, 7, 3).minus({ days: 1000 });
  const givenDays = position;
  const newDate = startDate.plus({ days: parseInt(givenDays) }).toISODate();

  if (parseInt(givenDays) < 1000 || givenDays == null) {
    return '';
  }

  return newDate;
}

export function bankRevenueBillExpirationDate(position: string): string {
  const newDate = DateTime.fromISO(position).toISODate();
  if (newDate < DateTime.local(1993, 10, 7).toISODate()) {
    return '';
  }

  if (newDate == null) {
    return '';
  }
  return newDate;
}
