const { ROOMS } = require('../../shared/variables/room')
const { acceptEmoji } = require('../../shared/variables/accept_emoji')
const { buildRoomText } = require('../../shared/functions/rooms/build_room_message')

module.exports.openRoom = async (msg) => {
    const creator = msg.author;
    const room = {
        users: [creator],
        game: msg.channel.name,
    };
    const texto = buildRoomText(room);
    const roomMessage = await msg.channel.send(texto);

    roomMessage.react(acceptEmoji);

    room.id = roomMessage.id;
    ROOMS[room.id] = room;
    console.log(ROOMS);
}