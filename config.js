let config;

if (process.env.NODE_ENV === 'production') {
    config = {
        token: process.env.API_KEY,
        clientID: process.env.DB_PASSWORD,
        guildID: process.env.GUILDID,
        notifyChannelId: process.env.NOTIFYCHANNELID,
        dailyNotifyGroupId: process.env.DAILYNOTIFYGROUPID,
    };
} else {
    config = require('./config.json');
}

module.exports = config;
