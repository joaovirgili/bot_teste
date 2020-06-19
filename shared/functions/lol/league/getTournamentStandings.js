const { PANDA_KEY } = require('../../../../.config');
const axios = require('axios');
const moment = require('moment');

module.exports.getTournamentStandings = async function (msg, id, leagueName) {
    var url = `https://api.pandascore.co/tournaments/${id}/standings?token=${PANDA_KEY}`;

    try {
        const res = await axios.get(url);
        if (res.status === 200) {
            let times = res.data.map((position) => {
                if (position.team.acronym.length === 2) {
                    position.team.acronym += ' ';
                }
                return `\`${position.rank}. ${position.team.acronym}  ${position.wins}-${position.losses}\``;
            })
            msg.channel.send([leagueName].concat(times));
        } else {
            console.log(res);
            msg.channel.send('Deu merda');
        }
    } catch (error) {
        console.error(error);
        msg.channel.send('Deu merda');
    }
}