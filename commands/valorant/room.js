const { ROOMS } = require('../../shared/variables/room')
const { acceptEmoji, cancelEmoji } = require('../../shared/variables/emojis')
const { buildRoomText } = require('../../shared/functions/rooms/build_room_message')

module.exports.openRoom = async (msg, horario) => {

    const author = msg.author;
    const room = {
        users: [author],
        game: msg.channel.name,
        owner: author.id,
        time: horario,
    };
    const texto = buildRoomText(room);
    const roomMessage = await msg.channel.send(texto);

    roomMessage.react(acceptEmoji);
    roomMessage.react(cancelEmoji);

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

