const { getLeagueTodayMatchs } = require('../../shared/functions/lol/league/getLeagueTodayMatch');

module.exports.cblol = (msg) => {
    getLeagueTodayMatchs(msg, "302");
}

module.exports.lec = (msg) => {
    getLeagueTodayMatchs(msg, "4197");
}

module.exports.lck = (msg) => {
    getLeagueTodayMatchs(msg, "293");
}

module.exports.lcs = (msg) => {
    getLeagueTodayMatchs(msg, "4198");
}