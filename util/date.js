export function getFormatDate(date) {
  return `${date.getFullYear()}-${
    date.getMonth() >= 10 ? date.getMonth() : "0" + date.getMonth()
  }-${date.getDate() >= 10 ? date.getDate() : "0" + date.getDate()}`;
}

export function getDateMinuteDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
