const axios = require('axios');

module.exports.xinga = async () => {
    var url = `http://xinga-me.appspot.com/api`
    const res = await axios.get(url);
    if (res.status === 200) {
        return res.data.xingamento;
    }
}