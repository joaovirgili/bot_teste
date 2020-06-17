module.exports.getUser = (msg, username) => {
    return msg.channel.members.find(member => member.user.username == username);
}