const { PANDA_KEY } = require('../../../.config');
const axios = require('axios');
const moment = require('moment');

module.exports.getProximoJogoCSGO = async (msg, time) => {
    var url = `https://api.pandascore.co/teams/${time}/matches?token=${PANDA_KEY}`;
    const res = await axios.get(url);
    if (res.status === 200) {
        const match = res.data[0];
        const date = moment(match.original_scheduled_at).format("dddd - DD/MM");
        const message = `${date}\n${match.name}`;

        msg.channel.send(message);
    } else {
        console.log(res);
        msg.channel.send("Deu ruim");
    }
}