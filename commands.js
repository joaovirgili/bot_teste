const csgo_teams = require('./commands/csgo/teams');
const brother = require('./commands/fun/brother');
const lol_leagues = require('./commands/lol/league');

module.exports.COMMANDS = {
    "!mibr": csgo_teams.mibr,
    "!furia": csgo_teams.furia,
    "!jay": brother.jay,
    "!piska": brother.piska,
    "!elcio": brother.elcio,
    "!gustavo": brother.gustavo,
    "!rocha": brother.rocha,
    "!alfredo": brother.alfredo,
    "!luji": brother.luji,
    "!peta": brother.peta,
    "!polishop": brother.polishop,
    "!bells": brother.bells,
    "!cblol": lol_leagues.cblol,
    "!lck": lol_leagues.lck,
    "!lec": lol_leagues.lec,
    "!lpl": lol_leagues.lpl,
}