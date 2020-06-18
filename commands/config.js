const COMMANDS  = require('../commands');

module.exports.commands = (msg) => {
    const keys = Object.keys(COMMANDS.COMMANDS);
    msg.channel.send(keys);
}