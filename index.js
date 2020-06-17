const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');
const moment = require('moment');
const { DISCORD_KEY } = require('./config');
const { COMMANDS } = require('./commands');
const getProximoJogoCSGO = require('./shared/functions/csgo/get_proximo_jogo');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {

    const action = COMMANDS[msg.content];
    if (action) {
        action(msg);
    }

    if (msg.content === '!crime') {
        msg.channel.send(`https://cdn.discordapp.com/attachments/485273916093497345/722257188781031454/crime.png`);
    }

    if (msg.content === '!ezplay') {
        msg.channel.send('https://cdn.discordapp.com/attachments/389151772498984969/722255909631295568/555620_310768952325408_83299214_n.png');
    }

    if (msg.content === '!piada') {
        var url = "https://us-central1-kivson.cloudfunctions.net/charada-aleatoria";//Sua URL

        const res = await axios.get(url, { headers: { "Accept": "application/json" } });
        msg.channel.send(res.data.pergunta);
        await sleep(500);
        msg.channel.send("...");
        await sleep(500);
        msg.channel.send("...");
        await sleep(500);
        msg.channel.send(res.data.resposta);
    }

});

client.login(DISCORD_KEY);