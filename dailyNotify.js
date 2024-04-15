const moment = require('moment-timezone');
const MS_PER_DAY = 24 * 60 * 60 * 1000;
const { tasks } = require('./dailyNotifyTasks');

function calculateTimeoutTillMidnightUTC8() {
    const now = moment().tz('Asia/Taipei');
    const midnightUTC8 = now.clone().endOf('day').add(1, 'second');
    return midnightUTC8.diff(now);
}

/**
 * @param {import ('discord.js').Client} client
 * @returns
 */
async function sendMessage(client) {
    const channelName = ['通知', 'notify'];
    const roleName = '每日通知';
    const channel = client.channels.cache.find(ch => channelName.includes(ch.name) && ch.type === 'GUILD_TEXT');
    if (!channel) {
        console.error('未找到通知頻道');
        return;
    }

    const notifyRole = channel.guild.roles.cache.find(role => role.name === roleName);

    if (!notifyRole) {
        console.error('未找到指定的角色：每日通知');
        return;
    }

    await channel.send(`<@&${notifyRole.id}> \n跨日了 記得處理` + genDailyNotifyMessage(), { allowedMentions: { parse: ['users', 'roles', 'everyone'] } });
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