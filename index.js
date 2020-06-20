const Discord = require('discord.js');
const client = new Discord.Client();
const { DISCORD_KEY } = require('./.config');
const { COMMANDS } = require('./commands');
const { ROOMS } = require('./shared/variables/room')
const { acceptEmoji } = require('./shared/variables/accept_emoji');
const { buildRoomText } = require("./shared/functions/rooms/build_room_message")

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // // Criar a mensagem
    // const valorantChannel = await client.channels.fetch("723793249269186580");
    // // console.log()
    // await client.channels.cache.get("723793249269186580").messages.channel.bulkDelete(10)
    // valorantChannel.send("text 5");
});

client.on('message', async msg => {
    const action = COMMANDS[msg.content];

    // if (msg.content === `!delete` && msg.channel.name === "valorant") {
    //     try {
    //         msg.channel.bulkDelete(20);
    //     } catch (error) {
    //         // console.log(error);
    //     }
    // }

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
    if (!hasRoom(ROOMS, roomId)) return;

    const room = ROOMS[roomId];
    addUser(room, user);
    refreshRoomText(msg, room);

});

client.on('messageReactionRemove', async (msg, user) => {
    if (!user) return;
    if (user.bot) return;
    if (msg.emoji.name !== acceptEmoji) return;

    const roomId = msg.message.id;
    if (!hasRoom(ROOMS, roomId)) return;

    const room = ROOMS[roomId];
    removeUser(room, user);
    refreshRoomText(msg, room);
    console.log(ROOMS);

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