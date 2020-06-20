const { ROOMS } = require('../../shared/variables/room')
const { acceptEmoji } = require('../../shared/variables/accept_emoji')
const { buildRoomText } = require('../../shared/functions/rooms/build_room_message')

module.exports.openRoom = async (msg, horario) => {

    const author = msg.author;
    const room = {
        users: [author],
        game: msg.channel.name,
        owner: author.id,
        time: horario
    };
    const texto = buildRoomText(room);
    const roomMessage = await msg.channel.send(texto);

    roomMessage.react(acceptEmoji);

    room.id = roomMessage.id;
    ROOMS[room.id] = room;
}

module.exports.cancel = async (msg) => {
    const uid = msg.author.id;
    const room = getUserRoom(uid);
    if (!room) return;
    const roomMessage = await msg.channel.messages.fetch(room.id);
    deleteRoom(roomMessage, room.id);
}

function getUserRoom(uid) {
    return Object.values(ROOMS).find(room => room.owner == uid);
}

async function deleteRoom(msg, id) {
    await msg.delete();
    delete ROOMS[id];
    console.log(ROOMS);
}