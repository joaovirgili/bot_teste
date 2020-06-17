const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');
const moment = require('moment');
const DISCORD_KEY = require('./config');
const { HLTV } = require('hltv');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {

    if (msg.content === '!mibr') {
        getProximoJogoCSGO(msg, "3250");
    }

    if (msg.content === '!furia') {
        getProximoJogoCSGO(msg, "124530");
    }

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
    if (msg.content === '!bells') {
        const user = getUser(msg, 'Bells');
        msg.channel.send(`<@${user.id}> https://scontent.fssa7-1.fna.fbcdn.net/v/t1.0-9/252610_227581317253328_5612844_n.jpg?_nc_cat=100&_nc_sid=cdbe9c&_nc_eui2=AeG7amDxKKRpHlRi9m0eD8CLdIs_Dm4YyWR0iz8ObhjJZGWm6aFYDPapD0tSbBar0ilKuIPKN3ksHkgmdQXhGT53&_nc_ohc=xjtgTh_A0BEAX_zbHgc&_nc_ht=scontent.fssa7-1.fna&oh=fa40991e9cef6b93f80d7508fb5ccb1d&oe=5F0DB6EE`);
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

    if (msg.content === "!cblol") {
        getJogosLiga(msg, 302);
    }
    if (msg.content === "!lec") {
        getJogosLiga(msg, 4197);
    }
    if (msg.content === "!lck") {
        getJogosLiga(msg, 293);
    }
    if (msg.content === "!lcs") {
        getJogosLiga(msg, 4198);
    }

});

async function getProximoJogoCSGO(msg, time) {
    var url = `https://api.pandascore.co/teams/${time}/matches?token=gVCbvbyDzmyqsQJPJfT6YXp9NkBFFdpcwMAPDSfmO_YQMljNiJY`;

    const res = await axios.get(url);
    if (res.status === 200) {
        const jogo = res.data[0];

        let mensagem = `${moment(jogo.original_scheduled_at).format("dddd - DD/MM")}\n`;
        mensagem += jogo.name;

        msg.channel.send(mensagem);
    } else {
        console.log(res);
    }
}

async function getJogosLiga(msg, liga_id) {
    var url = `https://api.pandascore.co/leagues/${liga_id}/matches/upcoming?token=gVCbvbyDzmyqsQJPJfT6YXp9NkBFFdpcwMAPDSfmO_YQMljNiJY`;

    var hoje = moment();

    const res = await axios.get(url);
    if (res.status === 200) {
        const jogos = res.data;

        let jogosHoje = getJogosByDate(jogos, hoje);

        if (jogosHoje.length === 0) {
            jogosHoje = getJogosProximoDia(jogos);
        }

        let mensagem = moment(jogosHoje[0].original_scheduled_at).format("dddd - DD/MM");

        mensagem = mensagem + jogosHoje.map(jogo => {
            const dataJogo = moment(jogo.original_scheduled_at);
            return `\n${jogo.name} - ${dataJogo.format("HH:mm")}`
        });

        msg.channel.send(mensagem);

    } else {
        console.log(res);
        msg.channel.send("Deu merda");
    }
}

function getJogosProximoDia(jogos) {
    const primeiroJogo = jogos[0];
    const dataPrimeiroJogo = moment(primeiroJogo.original_scheduled_at);
    return getJogosByDate(jogos, dataPrimeiroJogo);
}

function getJogosByDate(jogos, date) {
    return jogos.filter(jogo => {
        const dataJogo = moment(jogo.original_scheduled_at);
        return date.isSame(dataJogo, 'day') && date.isSame(dataJogo, 'month');
    });
}

client.login(DISCORD_KEY);

function getUser(msg, username) {
    return msg.channel.members.find(member => member.user.username == username)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}