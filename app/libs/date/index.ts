import dayjs, { OpUnitType, QUnitType } from 'dayjs';

export const FORMAT = {
  YYYYMMDD: 'YYYY-MM-DD',
  YYYYMMDD_HHMMSS: 'YYYY-MM-DD HH:mm:ss',
  YYYYMMDD_HHMM: 'YYYY-MM-DD HH:mm',
  MM_YY: 'MM/YY',
  HHMMSS: 'HH:mm:ss',
  MMMM_D_YYYY: 'MMMM D, YYYY',
};

export const dayjsWrap = (
  date?: string | number | dayjs.Dayjs | Date | null | undefined,
) => {
  return dayjs(date);
};

export const getDateFormat = (
  date: number | Date | string | null | undefined,
  key = FORMAT.MMMM_D_YYYY,
  format = '',
) => {
  if (!date) {
    return format;
  }
  const mom = dayjsWrap(date);
  if (mom.isValid()) {
    return mom.format(key);
  }
  return format;
};

export const diffCurrentDate = (
  date: number | Date | string | null | undefined,
  unit?: QUnitType | OpUnitType,
  float?: boolean,
) => {
  if (!date) {
    return 0;
  }
  const mom = dayjsWrap(date);
  if (mom.isValid()) {
    return mom.diff(dayjsWrap(), unit, float);
  }
  return 0;
};

export function distanceInWordsToNow(date: string) {
  const now = dayjs().toDate().getTime();
  const diff = now - dayjs(date).toDate().getTime();

  if (diff < 1000 * 60 * 5) {
    return 'now';
  }

  if (diff < 1000 * 60 * 60) {
    return `${Math.floor(diff / (1000 * 60))}m ago`;
  }

  if (diff < 1000 * 60 * 60 * 24) {
    return `${Math.floor(diff / (1000 * 60 * 60))}h ago`;
  }

  if (diff < 1000 * 60 * 60 * 24 * 7) {
    return `${Math.floor(diff / (1000 * 60 * 60 * 24))}d ago`;
  }

  return getDateFormat(date, FORMAT.MMMM_D_YYYY);
}
