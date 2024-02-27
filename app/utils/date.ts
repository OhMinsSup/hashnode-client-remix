import dayjs from "dayjs";

/**
 * @description 메인 위젯에서 임시 저장된 아이템의 날짜를 포맷합니다.
 */
export function mainWidgetDraftItemFormatter(date: string | Date) {
  return dayjs(date).format("MMM D");
}

export function feedCardDateFormatter(date: string | Date) {
  return dayjs(date).format("MMM D, YYYY");
}
