export function getFormatDate(date) {
  return `${date.getFullYear()}-${
    date.getMonth() >= 10 ? date.getMonth() : "0" + date.getMonth()
  }-${date.getDate() >= 10 ? date.getDate() : "0" + date.getDate()}`;
}

export function getDateMinuteDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

export function getFollowWeek(date, data) {
  const daysOfWeek = [0, 2, 3, 4, 5, 6, 7];
  const getWeek = daysOfWeek[date.getDay()];
  const result = data.filter((e) => {
    // console.log(getFormatDate(e.date));
    // console.log(getFormatDate(e.date).slice(0, 4));
    return e.date > getDateMinuteDays(date, 7);
  });
  return result;
}

export function getFollowMonth(date, data) {
  const result = data.filter((e) => {
    return +getFormatDate(e.date).slice(5, 7) === date;
  });
  return result;
}

export function getFollowYear(date, data) {
  const result = data.filter((e) => {
    console.log(+getFormatDate(e.date).slice(0, 4));
    return +getFormatDate(e.date).slice(0, 4) === date;
  });
  return result;
}
