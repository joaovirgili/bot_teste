const { ROOMS } = require('../../shared/variables/room')
const { acceptEmoji } = require('../../shared/variables/accept_emoji')
const { buildRoomText } = require('../../shared/functions/rooms/build_room_message')

module.exports.openRoom = async (msg) => {
    const creator = msg.author;
    const room = [creator];
    const texto = buildRoomText(msg.channel.name, room);
    const roomMessage = await msg.channel.send(texto);

    roomMessage.react(acceptEmoji);
    ROOMS[roomMessage.id] = room;
}