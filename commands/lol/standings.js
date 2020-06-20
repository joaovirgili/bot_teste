const { PANDA_KEY } = require('../../.config');
const axios = require('axios');

const { getTournamentStandings } = require('../../shared/functions/lol/league/getTournamentStandings')
module.exports.cblol = async (msg) => {
	getTournamentStandings(msg, 4152, "`CBLOL`")
};
module.exports.lcs = async (msg) => {
	getTournamentStandings(msg, 3526, "`LCS`")
};
module.exports.lck = async (msg) => {
	getTournamentStandings(msg, 4150, "`LCK`")
};
module.exports.lpl = async (msg) => {
	getTournamentStandings(msg, 4240, "`LPL`")
};
module.exports.lec = async (msg) => {
	getTournamentStandings(msg, 4151, "`LEC`")
};
