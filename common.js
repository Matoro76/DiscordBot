const client = require('./index');
const { guildId } = require('./config');
/**
 * 透過可能的頻道名稱查找文字頻道，並返回第一個查詢結果
 * @param {Array} channelName
 */
function findTextChannelByChannelName(channelName) {
  const channel = client.channels.cache.find(
    ch => channelName.includes(ch.name) && ch.type === 'GUILD_TEXT'
  );
  if (!channel) {
    for (const chName of channelName) {
      console.error(`未找到${chName}頻道`);
    }
    return;
  }
  return channel;
}

/**
 * 透過可能的身分組名稱查找身分組，並返回第一個查詢結果
 * @param {Array} roleName
 */
function findRoleByRoleName(roleName) {
  const guild = client.guilds.cache.get(guildId);
  if (guild) {
    const role = guild.roles.cache.find(r => roleName.includes(r.name));
    if (role) {
      return role;
    }
  }
  return;
}

async function sendMessage(channel, message) {
  await channel.send(message);
}

const common = {
  findTextChannelByChannelName,
  findRoleByRoleName,
  sendMessage,
};

module.exports = common;
