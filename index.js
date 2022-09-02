//This is the main file
//.eslintrc.json is a linter that helps with syntax
//package.json keeps track of the dependencies your project uses
//config.json is where you keep all your valuable info
//.env allows to copy our token into the cmd line

//TIP: You can open your package.json file and edit the "main": "index.js" field 
//to point to your main file. You can then run node . in your terminal to start the process!
//you can press the up arrow on your keyboard to bring up the latest commands you've run
//Ctrl+c to end the program

//fs is a native file system module
//path allows us to use "path.join()" and pass each path segment as an argument
const fs = require('node:fs');
const path = require('node:path');

// Require the necessary discord.js classes
const { Client,Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//Collection is an extension of map 
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

//Interactions with commands - probably dont need this section anymore
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

    //This used to a bynch of if else statements
    //Dynamically executing command using client.command
	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Login to Discord with your client's token
client.login(token);

//Allows to use anime images
const Anime_Images = require('anime-images-api');
const API = new Anime_Images();

