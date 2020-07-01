const axios = require('axios');

module.exports.getPointsByUser = async (channel, user) => {
    return (await axios.get(`https://api.streamelements.com/kappa/v2/points/${channel}/${user}`)).data;
} 