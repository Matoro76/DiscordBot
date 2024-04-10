const { REST, Routes } = require('discord.js');

const { token, clientID, guildID } = require('./config');

const commands = [
    {
        name: 'ping',
        description: '得知機器人的延遲資訊',
    },
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationGuildCommands(clientID, guildID), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();