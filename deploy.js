const { REST, Routes } = require('discord.js');

const { token } = require('./config');

const commands = [
    {
        name: 'ping',
        description: '得知機器人的延遲資訊',
    },
];

const rest = new REST({ version: '10' }).setToken(token);

/**
 * @param {import ('discord.js').Client} client
 */
async function refreshCommands(client) {
    try {
        console.log('Started refreshing application (/) commands.');
        const guilds = client.guilds.cache.map(guild => guild);
        for (const guild of guilds) {
            await rest.put(
                Routes.applicationGuildCommands(client.user.id, guild.id),
                { body: commands },
            );
        }
    } catch (error) {
        console.error('Failed to refresh commands:', error);
    }
}

module.exports = { refreshCommands };