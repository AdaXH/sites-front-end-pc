export function getTime() {
  const d = new Date();
  const month = d.getMonth() + 1;
  const day = d.getDay();
  const hour = d.getHours();
  const minute = d.getMinutes();
  const sec = d.getSeconds();
  return {
    month,
    day,
    hour: hour < 10 ? '0' + hour : hour,
    minute: minute < 10 ? '0' + minute : minute,
    sec: sec < 10 ? '0' + sec : sec,
  };
}
