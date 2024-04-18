const momentTimeZone = require('moment-timezone');
const moment = require('moment');
function calculateTimeoutTillMidnightUTC8() {
  const now = momentTimeZone().tz('Asia/Taipei');
  const midnightUTC8 = now.clone().endOf('day').add(1, 'second');
  return midnightUTC8.diff(now);
}

function formatDuration(milliseconds) {
  const duration = moment.duration(milliseconds);
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  return `${hours} 小時 ${minutes} 分鐘 ${seconds} 秒`;
}

console.log(formatDuration(calculateTimeoutTillMidnightUTC8()));
