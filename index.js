const { token } = require('./config');
const setStatus = require('./status');
const { dailyNotify, minuteNotify } = require('./dailyNotify');
const { refreshCommands } = require('./deploy');
// eslint-disable-next-line no-unused-vars
const app = require('./app');

const client = require('./client');

client.on('ready', async () => {
  setStatus(client);
  dailyNotify(client);
  minuteNotify(client);
  await refreshCommands(client);
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
    await interaction.reply({
      content: '執行命令時出現錯誤！',
      ephemeral: true,
    });
  }
});

client.login(token);
global.client = client;
