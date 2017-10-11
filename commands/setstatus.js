exports.run = function(client, message, args) {
    var argresult = args.join(' ');
    if (!argresult) argresult = 'online';
    client.user.setStatus(argresult);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 4
};

exports.help = {
    name: 'setstatus',
    description: "Sets the status of the bot",
    usage: "setstatus <idle,dnd,online>"
};