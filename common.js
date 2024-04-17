const { guildId: GUILD_ID } = require('./config');

/**
 * 透過可能的頻道名稱查找文字頻道，並返回第一個查詢結果
 * @param {import ('discord.js').Client} client
 * @param {Array} channelNames
 */
function findTextChannelByChannelName(client, channelNames) {
  const guild = getGuildByGuildId(GUILD_ID, client);
  if (guild) {
    for (const ch of guild.channels.cache.values()) {
      if (channelNames.includes(ch.name)) {
        return ch;
      }
    }
  }
  return null;
}

/**
 * 透過可能的身分組名稱查找身分組，並返回第一個查詢結果
 * @param {import ('discord.js').Client} client
 * @param {Array} roleName
 */
function findRoleByRoleName(client, roleNames) {
  const guild = getGuildByGuildId(GUILD_ID, client);
  if (guild) {
    for (const role of guild.roles.cache.values()) {
      if (roleNames.includes(role.name)) {
        return role;
      }
    }
  }
  return null;
}

async function sendMessage(channel, message) {
  await channel.send(message);
}

function getGuildByGuildId(client, guildId) {
  return client.guilds.cache.get(guildId);
}

const common = {
  findTextChannelByChannelName,
  findRoleByRoleName,
  sendMessage,
};

module.exports = common;
