const { getUser } = require('../../shared/functions/discord/get_user');

module.exports.jay = (msg) => {
    const user1 = getUser(msg, 'Jay.');
    const user2 = getUser(msg, 'Japeta');
    msg.channel.send(`<@${user1.id}> > <@${user2.id}>`);
}
module.exports.piska = (msg) => {
    const user = getUser(msg, 'lipake');
    msg.channel.send(`<@${user.id}> é tiltado`);
}
module.exports.elcio = (msg) => {
    const user = getUser(msg, 'Alécio Filho');
    msg.channel.send(`<@${user.id}> é criminoso`);
}
module.exports.gustavo = (msg) => {
    const user = getUser(msg, 'Gustavo');
    msg.channel.send(`<@${user.id}> é puta`);
}
module.exports.rocha = (msg) => {
    const user = getUser(msg, 'peu');
    msg.channel.send(`<@${user.id}> é doente`);
}
module.exports.alfredo = (msg) => {
    const user = getUser(msg, 'xburguer');
    msg.channel.send(`<@${user.id}> é fumante de derby`);
}
module.exports.luji = (msg) => {
    const user = getUser(msg, 'lud');
    msg.channel.send(`<@${user.id}> tem pinto pequeno`);
}
module.exports.peta = (msg) => {
    const user = getUser(msg, 'peta');
    msg.channel.send(`<@${user.id}> Delirou`);
}
module.exports.polishop = (msg) => {
    const user = getUser(msg, 'polishop');
    msg.channel.send(`<@${user.id}> sabe tudo`);
}
module.exports.bells = (msg) => {
    const user = getUser(msg, 'Bells');
    msg.channel.send(`<@${user.id}> https://scontent.fssa7-1.fna.fbcdn.net/v/t1.0-9/252610_227581317253328_5612844_n.jpg?_nc_cat=100&_nc_sid=cdbe9c&_nc_eui2=AeG7amDxKKRpHlRi9m0eD8CLdIs_Dm4YyWR0iz8ObhjJZGWm6aFYDPapD0tSbBar0ilKuIPKN3ksHkgmdQXhGT53&_nc_ohc=xjtgTh_A0BEAX_zbHgc&_nc_ht=scontent.fssa7-1.fna&oh=fa40991e9cef6b93f80d7508fb5ccb1d&oe=5F0DB6EE`);

}