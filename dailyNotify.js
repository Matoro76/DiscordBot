const { tasks } = require('./dailyNotifyTasks');
const common = require('./common');
const channelName = ['notify'];
const roleName = '每日通知';
const cron = require('node-cron');

async function sendMessage(client) {
  const channel = common.findTextChannelByChannelName(client, channelName);
  const notifyRole = common.findRoleByRoleName(client, roleName);
  await channel.send(
    `<@&${notifyRole.id}> \n跨日了 記得處理` + genDailyNotifyMessage(),
    { allowedMentions: { parse: ['users', 'roles', 'everyone'] } }
  );
  // 這裡應該可以新增跨日要處理的事情detail
  // 以DB記錄，並透過web或bot更新
}

async function dailyNotify(client) {
  const cronJob = cron.schedule(
    '0 0 0 * * *',
    () => {
      sendMessage(client);
    },
    {
      scheduled: false,
      timezone: 'Asia/Taipei',
    }
  );
  cronJob.start(client);
  console.log('已設定開始執行cron job');
}

function genDailyNotifyMessage() {
  let dailyNotifyMessage = '';
  tasks.forEach((task, index) => {
    dailyNotifyMessage += `\n${index + 1}. ${task}`;
  });
  return dailyNotifyMessage;
}

module.exports = dailyNotify;
