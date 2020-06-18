const { PANDA_KEY } = require('../../../../.config');
const axios = require('axios');
const moment = require('moment');

module.exports.getLeagueTodayMatchs = async function (msg, liga_id) {
	var url = `https://api.pandascore.co/leagues/${liga_id}/matches/upcoming?token=${PANDA_KEY}`;

	var hoje = moment();

	try {
		const res = await axios.get(url);

		if (res.status === 200) {
			const jogos = res.data;

			let jogosHoje = getJogosByDate(jogos, hoje);

			if (jogosHoje.length === 0) {
				jogosHoje = getJogosProximoDia(jogos);
			}

			let mensagem = moment(jogosHoje[0].original_scheduled_at).format(
				'dddd - DD/MM'
			);

			mensagem =
				mensagem +
				jogosHoje.map((jogo) => {
					const dataJogo = moment(jogo.original_scheduled_at);
					return `\n${jogo.name} - ${dataJogo.format('HH:mm')}`;
				});

			msg.channel.send(mensagem);
		} else {
			console.log(res);
			msg.channel.send('Deu merda');
		}
	} catch (error) {
		console.error(error);
		msg.channel.send('Deu merda');
	}
};

function getJogosProximoDia(jogos) {
	const primeiroJogo = jogos[0];
	const dataPrimeiroJogo = moment(primeiroJogo.original_scheduled_at);
	return getJogosByDate(jogos, dataPrimeiroJogo);
}

function getJogosByDate(jogos, date) {
	return jogos.filter((jogo) => {
		const dataJogo = moment(jogo.original_scheduled_at);
		return date.isSame(dataJogo, 'day') && date.isSame(dataJogo, 'month');
	});
}
