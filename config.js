let config;

if (process.env.NODE_ENV === 'production') {
    config = {
        token: process.env.TOKEN,
        notifyChannelId: process.env.NOTIFYCHANNELID,
        dailyNotifyGroupId: process.env.DAILYNOTIFYGROUPID,
    };
} else {
    config = require('./config.json');
}

module.exports = config;
