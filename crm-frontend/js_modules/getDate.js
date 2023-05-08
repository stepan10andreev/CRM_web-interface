// функция преобразования времени и датыб полученнjq с сервера в номральный формат
export function getDate(time) {
  const date = new Date(time);
  let [month, day, year] = [
  date.getMonth() + 1,
  date.getDate(),
  date.getFullYear(),
  ];
  let [hour, minutes] = [
  date.getHours(),
  date.getMinutes(),
  ];
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  if (hour < 10) {
    hour = '0' + hour;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  let dateValue =  `${day}.${month}.${year}`;
  let timeValue = `${hour}:${minutes}`;
  return {
    dateValue,
    timeValue
  }
}
