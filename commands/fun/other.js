const { getUser } = require('../../shared/functions/discord/get_user');

module.exports.crime = (msg) => {
	msg.channel.send(
		`https://cdn.discordapp.com/attachments/485273916093497345/722257188781031454/crime.png`
	);
};
module.exports.ezplay = (msg) => {
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/389151772498984969/722255909631295568/555620_310768952325408_83299214_n.png'
	);
};
module.exports.highlander = (msg) => {
	const user = getUser(msg, 'Cvs1');
	msg.channel.send(`<@${user.id}> tiltou pq eles tem camisa`);
};

module.exports.loritta = (msg) => {
	const user = getUser(msg, 'Loritta');
	msg.channel.send(`Pau no cu da <@${user.id}>. Eu sou muito melhor!`);
};
