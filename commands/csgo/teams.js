const { getProximoJogoCSGO } = require('../../shared/functions/csgo/get_proximo_jogo');

module.exports.mibr = (msg) => {
    getProximoJogoCSGO(msg, "3250");
}

module.exports.furia = (msg) => {
    getProximoJogoCSGO(msg, "124530");
}
