const { PANDA_KEY } = require('../../.config');
const axios = require('axios');

module.exports.cblol = async (msg, id = 4152) => {
	var url = `https://api.pandascore.co/tournaments/${id}/standings?token=${PANDA_KEY}`;

	try {
		const res = await axios.get(url);
		console.log(res.data);
		if (res.status === 200) {
			msg.channel.send(
				res.data.map((team) => {
					if (team.team.acronym.length === 2) {
						team.team.acronym += ' ';
					}
					return `\`${team.rank}. ${team.team.acronym}  ${team.wins}-${team.losses}\``;
				})
			);
		} else {
			console.log(res);
			msg.channel.send('Deu merda');
		}
		msg.channel.send();
	} catch (error) {
		console.error(error);
		msg.channel.send('Deu merda');
	}
};
