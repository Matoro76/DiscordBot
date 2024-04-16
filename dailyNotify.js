const moment = require('moment-timezone');
const MS_PER_DAY = 24 * 60 * 60 * 1000;
const { tasks } = require('./dailyNotifyTasks');
const common = require('./common');
const channelName = ['通知', 'notify'];
const roleName = '每日通知';

function calculateTimeoutTillMidnightUTC8() {
  const now = moment().tz('Asia/Taipei');
  const midnightUTC8 = now.clone().endOf('day').add(1, 'second');
  return midnightUTC8.diff(now);
}

/**
 * @param {import ('discord.js').Client} client
 * @returns
 */
async function sendMessage() {
  const channel = common.findTextChannelByChannelName(channelName);
  if (!channel) {
    return;
  }

  const notifyRole = common.findRoleByRoleName(roleName);

  if (!notifyRole) {
    return;
  }

  await channel.send(
    `<@&${notifyRole.id}> \n跨日了 記得處理` + genDailyNotifyMessage(),
    { allowedMentions: { parse: ['users', 'roles', 'everyone'] } }
  );
  // 這裡應該可以新增跨日要處理的事情detail
  // 以DB記錄，並透過web或bot更新
}

async function dailyNotify() {
  setTimeout(() => {
    sendMessage();
    setInterval(async () => {
      await sendMessage();
    }, MS_PER_DAY);
  }, calculateTimeoutTillMidnightUTC8());
}

function genDailyNotifyMessage() {
  let dailyNotifyMessage = '';
  tasks.forEach((task, index) => {
    dailyNotifyMessage += `\n${index + 1}. ${task}`;
  });
  return dailyNotifyMessage;
}

module.exports = dailyNotify;
