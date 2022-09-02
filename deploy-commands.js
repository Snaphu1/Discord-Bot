//Run "node deploy-commands.js" when you edit commands. This is a long way to do it
//Check in the commands folder for a more organized layout
const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const clientId = '1013208359165513741';
const guildId = '1013515301213708402';

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

/*const commands = [
	new SlashCommandBuilder().setName('hug').setDescription('Replies with hug GIF'),
	new SlashCommandBuilder().setName('love').setDescription('Replies with a kiss GIF'),
	new SlashCommandBuilder().setName('angry').setDescription('Replies with a slap/punch GIF'),
    new SlashCommandBuilder().setName('wink').setDescription('Replies with wink GIF'),
    new SlashCommandBuilder().setName('pat').setDescription('Replies with pat GIF'),
    new SlashCommandBuilder().setName('superangry').setDescription('Replies with kill GIF'),
    new SlashCommandBuilder().setName('missu').setDescription('Replies with cuddle GIF'),
    new SlashCommandBuilder().setName('girl').setDescription('Replies with a waifu'),
]
	.map(command => command.toJSON());
*/

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);