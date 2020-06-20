module.exports.buildRoomText = (room) => {

    function formatText(msg) {
        return `\`${msg}\``;
    }
    let title = `SALA`;
    if (room.time) {
        title += ` - ${room.time}`
    }
    const usersList = room.users.map((user, index) => `${index + 1}. ${user.username}`);
    const texto = [title, ...usersList.map(formatText)];
    texto.push("\`--------------------\`");


    return texto;
}