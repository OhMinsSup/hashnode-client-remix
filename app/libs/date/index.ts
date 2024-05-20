import dayjs from 'dayjs';

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
  const mom = dayjsWrap(new Date(date));
  if (mom.isValid()) {
    return mom.format(key);
  }
  return format;
};
