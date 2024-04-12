const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});
const { token } = require('./config');
const setStatus = require('./status');
const dailyNotify = require('./notify');
const express = require('express');
const app = express();


client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// 將命令添加到集合中，以命令名為鍵
	client.commands.set(command.name, command);
}

client.on('ready', () => {
	setStatus(client);
	dailyNotify(client);
});

app.get('/ping', (req, res) => {
	res.send('pong');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Express server running on port ${PORT}`);
});

// execute slash commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: '執行命令時出現錯誤！', ephemeral: true });
	}
});

client.login(token);
