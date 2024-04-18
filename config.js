let config;

if (process.env.NODE_ENV === 'production') {
  config = {
    token: process.env.TOKEN,
    guildId: process.env.GUILD_ID,
  };
} else {
  config = require('./config.json');
}

module.exports = config;
