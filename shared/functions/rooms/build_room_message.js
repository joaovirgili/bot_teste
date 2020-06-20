module.exports.buildRoomText = (room) => {

    function formatText(msg) {
        return `\`${msg}\``;
    }
    const title = `SALA DO ${room.game.toUpperCase()}`;
    const usersList = room.users.map((user, index) => `${index + 1}. ${user.username}`);
    const texto = [title, ...usersList].map(formatText);

    return texto;
}