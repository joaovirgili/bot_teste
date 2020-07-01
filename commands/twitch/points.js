
const { getPointsByUser } = require('../../shared/functions/twitch/points_by_user');

channels = {
    "mch": "5d09718f6f1e915638e526e3",
    "brn": "5ae348d0d5faae6f89294807",
    "mxm": "5e533033161188aa5955edc5",
}

module.exports.getPoints = async (msg, user) => {
    const mch = await getPointsByUser(channels.mch, user);
    const brn = await getPointsByUser(channels.brn, user);
    const mxm = await getPointsByUser(channels.mxm, user);

    const message = [
        `\`mch: ${mch["points"]}\``,
        `\`brn: ${brn["points"]}\``,
        `\`mxm: ${mxm["points"]}\``,
    ]

    msg.channel.send(message);
}

module.exports.getPointsJP = async (msg) => {
    const mch = await getPointsByUser(channels.mch, "joaovirgili");
    const brn = await getPointsByUser(channels.brn, "joaovirgili");
    const mxm = await getPointsByUser(channels.mxm, "joaovirgili");

    const message = [
        `\`mch: ${mch["points"]}\``,
        `\`brn: ${brn["points"]}\``,
        `\`mxm: ${mxm["points"]}\``,
    ]

    msg.channel.send(message);
}