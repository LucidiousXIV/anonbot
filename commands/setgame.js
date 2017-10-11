exports.run = function(client, message, args) {
    let game = args[0]
    let stream = args[1]
    if (!game) game = null;
    client.user.setGame(game, stream);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 4
};

exports.help = {
    name: 'setgame',
    description: 'Sets the bot to gaming as well as streaming if provided a twitch link',
    usage: "setgame <game> [twitch link]"
};