exports.run = (client, message) => {
    message.channel.sendMessage('Ping?')
      .then(message => {
          message.edit(`Pong! (took: ${message.createdTimestamp - message.createdTimestamp}ms)`);
      });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["pong"],
    permLevel: 0
};

exports.help = {
    name: 'ping',
    description: 'Ping/Pong command. I wonder what this does? /sarcasm',
    usage: 'ping'
};
