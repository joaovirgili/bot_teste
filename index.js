const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');
const DISCORD_KEY = require('./config');
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {

    if (msg.content === '!9') {
        msg.channel.send(`9? 99? 999?`, { tts: true });
    }
    if (msg.content === '!g3x') {
        msg.channel.send(`g? 3? x? x? x?`, { tts: true });
    }
    if (msg.content === '!crime') {
        msg.channel.send(`https://cdn.discordapp.com/attachments/485273916093497345/722257188781031454/crime.png`);
    }

    if (msg.content === '!ezplay') {
        msg.channel.send('https://cdn.discordapp.com/attachments/389151772498984969/722255909631295568/555620_310768952325408_83299214_n.png');
    }
    if (msg.content === '!jay') {
        const user1 = getUser(msg, 'Jay.');
        const user2 = getUser(msg, 'Japeta');
        msg.channel.send(`<@${user1.id}> > <@${user2.id}>`);
    }
    if (msg.content === '!piska') {
        const user = getUser(msg, 'lipake');
        msg.channel.send(`<@${user.id}> é tiltado`);
    }
    if (msg.content === '!elcio') {
        const user = getUser(msg, 'Alécio Filho');
        msg.channel.send(`<@${user.id}> é criminoso`);
    }
    if (msg.content === '!gustavo') {
        const user = getUser(msg, 'Gustavo');
        msg.channel.send(`<@${user.id}> é puta`);
    }
    if (msg.content === '!rocha') {
        const user = getUser(msg, 'peu');
        msg.channel.send(`<@${user.id}> é doente`);
    }
    if (msg.content === '!alfredo') {
        const user = getUser(msg, 'xburguer');
        msg.channel.send(`<@${user.id}> é fumante de derby`);
    }
    if (msg.content === '!luji') {
        const user = getUser(msg, 'lud');
        msg.channel.send(`<@${user.id}> tem pinto pequeno`);
    }
    if (msg.content === '!peta') {
        const user = getUser(msg, 'peta');
        msg.channel.send(`<@${user.id}> Delirou`);
    }
    if (msg.content === '!polishop') {
        const user = getUser(msg, 'polishop');
        msg.channel.send(`<@${user.id}> sabe tudo`);
    }
    if (msg.content === '!polishop') {
        const user = getUser(msg, 'polishop');
        msg.channel.send(`<@${user.id}> sabe tudo`);
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

function getUser(msg, username) {
    return msg.channel.members.find(member => member.user.username == username)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}