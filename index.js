const Discord = require('discord.js');
const client = new Discord.Client();
const { DISCORD_KEY } = require('./.config');
const { COMMANDS } = require('./commands');
const { ROOMS } = require('./shared/variables/room')
const { acceptEmoji } = require('./shared/variables/accept_emoji');
const { buildRoomText } = require("./shared/functions/rooms/build_room_message")

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    const action = COMMANDS[msg.content];

    if (action) {
        action(msg);
    }

    if (msg.channel.name === "valorant" && msg.author.username != "Crime Info") {
        msg.delete();
    }
});

client.on('messageReactionAdd', async (msg, user) => {
    if (!user) return;
    if (user.bot) return;
    if (msg.emoji.name !== acceptEmoji) return;

    const roomId = msg.message.id;

    const room = ROOMS[roomId];
    if (room) {
        room.push(user);
        const roomMessage = await msg.message.channel.messages.fetch(roomId);
        const texto = buildRoomText(roomMessage.channel.name, room);
        roomMessage.edit(texto);
    }

});

client.on('messageReactionRemove', async (msg, user) => {
    if (!user) return;
    if (user.bot) return;
    if (msg.emoji.name !== acceptEmoji) return;

    const roomId = msg.message.id;

    const room = ROOMS[roomId];
    if (room) {
        const index = room.indexOf(user);
        room.splice(index, 1);
        const roomMessage = await msg.message.channel.messages.fetch(roomId);
        const texto = buildRoomText(roomMessage.channel.name, room);
        roomMessage.edit(texto);
    }

});

client.login(DISCORD_KEY); 