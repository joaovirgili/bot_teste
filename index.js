const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require("axios");
const { DISCORD_KEY, RITO_KEY } = require('./.config');
const { COMMANDS } = require('./commands');
const { ROOMS } = require('./shared/variables/room')
const { acceptEmoji, cancelEmoji } = require('./shared/variables/emojis');
const { buildRoomText } = require("./shared/functions/rooms/build_room_message")

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    // Commands with optional parameters
    if (msg.content.includes("!sala")) {
        entrada = msg.content.split(" ");
        if (entrada.length == 2) {
            const action = COMMANDS["!sala horario"];
            action(msg, entrada[1]);
        }
    }
    if (msg.content.includes("!elo")) {
        entrada = msg.content.split(" ")
        nomes = entrada.slice(1, entrada.length);
        nocon = ""
        for (i = 0; i < nomes.length; i++) {
            nocon = nocon + nomes[i]
        }
        var url = "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + nocon + "?api_key=" + RITO_KEY;
        response = await axios.get(url)
        var namexesq = response.data.name
        var userid = response.data.id
        var level = response.data.summonerLevel
        var img = response.data.profileIconId
        plyicon = "http://ddragon.leagueoflegends.com/cdn/10.13.1/img/profileicon/" + img + ".png"
        url = "https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + userid + "?api_key=" + RITO_KEY;
        response = await axios.get(url)
        var elo = response.data[0]
        var dados = {}
        if (elo === undefined) {
            dados.lixinho1 = true
        }
        else {
            dados.queue1 = elo.queueType
            dados.lixinho1 = false
            dados.elo1 = elo.tier + " " + elo.rank + " " + "LP:" + elo.leaguePoints
        }
        var elo = response.data[1]
        if (elo === undefined) {
            dados.lixinho2 = true
        }
        else {
            dados.queue2 = elo.queueType
            dados.lixinho2 = false
            dados.elo2 = elo.tier + " " + elo.rank + " " + "LP:" + elo.leaguePoints
        }
        var mensagemzin = ""
        if (dados.elo1 !== undefined) {
            mensagemzin = dados.elo1
        }
        if (dados.elo2 !== undefined) {
            mensagemzin = mensagemzin + "\n" + dados.elo2
        }
        const embed = new Discord.MessageEmbed()
            .setTitle(namexesq)
            .addField("Level", level)
            .setColor(0x95C3B9)
            .setThumbnail(plyicon);
        if (dados.queue1 === "RANKED_SOLO_5x5") {
            embed.addField('Solo Q', dados.elo1)
        }
        else {
            if (dados.queue2 === "RANKED_SOLO_5x5") {
                embed.addField('Solo Q', dados.elo2)
            }
            else {
                embed.addField('Você é um', "FUDIDO na Solo Q")
            }
        }
        if (dados.queue1 === "RANKED_FLEX_SR") {
            embed.addField('Flex', dados.elo1)
        }
        else {
            if (dados.queue2 === "RANKED_FLEX_SR") {
                embed.addField('Flex', dados.elo2)
            }
            else {
                embed.addField('Você é um', "FUDIDO na Flex")
            }
        }
        msg.channel.send(embed);
    }
    if (msg.content === `!delete` && msg.channel.name === "lobby" && msg.author.id === "128018944970719232") {
        try {
            msg.channel.bulkDelete(20);
        } catch (error) {
            // console.log(error);
        }
    }
    const action = COMMANDS[msg.content];

    if (action) {
        action(msg);
    }

    if (msg.channel.name === "lobby" && msg.author.username != "Crime Info") {
        msg.delete();
    }
});

client.on('messageReactionAdd', async (msg, user) => {
    if (!user) return;
    if (user.bot) return;
    const roomId = msg.message.id;
    if (!hasRoom(ROOMS, roomId)) return;
    const room = ROOMS[roomId];

    if (msg.emoji.name === acceptEmoji) {
        if (room.owner === user.id) {
            await msg.users.remove(user);
            return;
        }
        addUser(room, user);
        refreshRoomText(msg, room);
        if (room.users.length > 4) {
            const general = await client.channels.fetch("389151772498984969");
            if (room["warn"]) {
                const oldWarn = await general.messages.fetch(room["warn"])
                await oldWarn.delete();
            }
            const warn = await general.send([
                "\`A sala está pronta\`",
                room.users.map(user => `<@${user.id}>`)
            ]);
            room["warn"] = warn.id;
        }
    }

    if (msg.emoji.name === cancelEmoji) {
        if (user.id === room.owner) {
            const roomMessage = await msg.message.channel.messages.fetch(room.id);
            deleteRoom(roomMessage);
            if (room["warn"]) {
                const general = await client.channels.fetch("389151772498984969");
                const oldWarn = await general.messages.fetch(room["warn"])
                await oldWarn.delete();
            }
        }
    }


});

async function deleteRoom(msg) {
    await msg.delete();
    delete ROOMS[msg.id];
}

client.on('messageReactionRemove', async (msg, user) => {
    if (!user) return;
    if (user.bot) return;
    if (msg.emoji.name !== acceptEmoji) return;

    const roomId = msg.message.id;
    if (!hasRoom(ROOMS, roomId)) return;

    const room = ROOMS[roomId];
    if (room.owner === user.id) return;
    removeUser(room, user);
    refreshRoomText(msg, room);

});

// Return if room exists
function hasRoom(ROOMS, roomId) {
    return ROOMS.hasOwnProperty(roomId);
}

// Add a new user to specific room
function addUser(room, user) {
    room.users.push(user);
}

// Removes a user from an specific room
function removeUser(room, user) {
    const index = room.users.indexOf(user);
    room.users.splice(index, 1);
}

// Refresh de text message of a room
async function refreshRoomText(msg, room) {
    const roomMessage = await msg.message.channel.messages.fetch(room.id);
    const texto = buildRoomText(room);
    roomMessage.edit(texto);
}

client.login(DISCORD_KEY); 