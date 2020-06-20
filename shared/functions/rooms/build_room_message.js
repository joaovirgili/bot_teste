module.exports.buildRoomText = (jogo, room) => {

    function formatText(msg) {
        return `\`${msg}\``;
    }
    const title = `SALA DO ${jogo.toUpperCase()}`;
    const usersList = room.map((user, index) => `${index + 1}. ${user.username}`);
    const texto = [title, ...usersList].map(formatText);

    return texto;
}