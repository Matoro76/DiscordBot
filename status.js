const { ActivityType } = require('discord.js');

/**
 * @param {import ('discord.js').Client} client
 */
function setStatus(client) {
  client.user.setStatus('online');
  client.user.setActivity('指令機器人', { type: ActivityType.Playing });
}

module.exports = setStatus;
