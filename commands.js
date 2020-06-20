const csgo_teams = require('./commands/csgo/teams');
const hltv = require('./commands/csgo/hltv');
const brother = require('./commands/fun/brother');
const lol_leagues = require('./commands/lol/league');
const other = require('./commands/fun/other');
const joke = require('./commands/fun/jokes');
const commands = require('./commands/config');
const standings = require('./commands/lol/standings');
const valorant = require('./commands/valorant/queue');

module.exports.COMMANDS = {
	'!c': commands.commands,
	'!mibr': csgo_teams.mibr,
	'!furia': csgo_teams.furia,
	'!jay': brother.jay,
	'!piska': brother.piska,
	'!elcio': brother.elcio,
	'!gustavo': brother.gustavo,
	'!rocha': brother.rocha,
	'!alfredo': brother.alfredo,
	'!luji': brother.luji,
	'!peta': brother.peta,
	'!polishop': brother.polishop,
	'!bells': brother.bells,
	'!cblol': lol_leagues.cblol,
	'!lck': lol_leagues.lck,
	'!lec': lol_leagues.lec,
	'!lpl': lol_leagues.lpl,
	'!crime': other.crime,
	'!ezplay': other.ezplay,
	'!highlander': other.highlander,
	'!piada': joke.joke,
	'!ranking cs': hltv.ranking,
	'!lucca': brother.lucca,
	'!tabela cblol': standings.cblol,
	'!loritta': other.loritta,
	'!pepo': brother.pepo,
	'!vava': valorant.startQueue,
};
