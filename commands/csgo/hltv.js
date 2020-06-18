const { HLTV } = require('hltv');

module.exports.ranking = async (msg) => {
	const ranking = await HLTV.getTeamRanking();

	msg.channel.send(
		ranking.slice(0, 10).map((ranking) => {
			let emoticon = '';
			if (ranking.change > 0) {
				emoticon = `:small_red_triangle: ${ranking.change}`;
			} else if (ranking.change < 0) {
				emoticon = `:small_red_triangle_down: ${Math.abs(
					ranking.change
				)}`;
			}

			return `${ranking.place} - ${ranking.team.name} ${emoticon}`;
		})
	);
};
