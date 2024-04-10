const now = new Date();
const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
const msUntilMidnight = midnight.getTime() - now.getTime();
const MS_PER_DAY = 24 * 60 * 60 * 1000;
const { notifyChannelId, dailyNotifyGroupId } = require('./config');
const { tasks } = require('./dailyNotifyTasks');

/**
 * @param {import ('discord.js').Client} client
 * @returns
 */
async function sendMessage(client) {
    const channel = client.channels.cache.get(notifyChannelId);
    if (!channel) {
        console.error('未找到通知頻道');
        return;
    }
    await channel.send(`<@&${dailyNotifyGroupId}> \n跨日了 記得處理` + genDailyNotifyMessage(), { allowedMentions: { parse: ['users', 'roles', 'everyone'] } });
    // 這裡應該可以新增跨日要處理的事情detail
    // 以DB記錄，並透過web或bot更新
}

/**
 * @param {import ('discord.js').Client} client
 */
async function dailyNotify(client) {
    setTimeout(() => {
        sendMessage(client);
        setInterval(async () => {
            await sendMessage(client);
        }, MS_PER_DAY);
    }, msUntilMidnight);
}

function genDailyNotifyMessage() {
    let dailyNotifyMessage = '';
    tasks.forEach((task, index) => {
        dailyNotifyMessage += `\n${index + 1}. ${task}`;
    });
    return dailyNotifyMessage;
}

module.exports = dailyNotify;