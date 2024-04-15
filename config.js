let config;

if (process.env.NODE_ENV === 'production') {
    config = {
        token: process.env.TOKEN,
    };
} else {
    config = require('./config.json');
}

module.exports = config;
