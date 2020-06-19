const Discord = require('discord.js');
const client = new Discord.Client();
const { DISCORD_KEY } = require('./.config');
const { COMMANDS } = require('./commands');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    const action = COMMANDS[msg.content];
    if (action) {
        action(msg);
    }
});

client.login(DISCORD_KEY); 