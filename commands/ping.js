// commands/ping.js
const moment = require('moment');

module.exports = {
    name: 'ping',
    execute: async (interaction) => {
        await interaction.reply('Pong!' + now());
    },
};

function now() {
    return moment().format('lll');
}
