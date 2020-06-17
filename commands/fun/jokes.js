const axios = require('axios');
const { sleep } = require('../../shared/functions/utils/sleep');

module.exports.joke = async (msg) => {
    var url = "https://us-central1-kivson.cloudfunctions.net/charada-aleatoria";

    const res = await axios.get(url, { headers: { "Accept": "application/json" } });
    msg.channel.send(res.data.pergunta);
    await sleep(500);
    msg.channel.send("...");
    await sleep(500);
    msg.channel.send("...");
    await sleep(500);
    msg.channel.send(res.data.resposta);
}