const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

const log = (msg) => {
    console.log(`[${moment().format('YYY-MM-DD HH:mm:ss')}] ${msg}`);
}

client.login(config.token);

//Debug/Warn/Error
client.on('debug', e => {
    console.log(chalk.bold.cyan(e));
})

client.on('warn', e => {
    console.log(chalk.bold.Red(e));
})

client.on('error', e => {
    console.log(chalk.bold.yellow(e));
})


//Some client events
client.on('channelCreate', channel => {
    console.log(`A ${channel.type} channel by the name of ${channel.name} was created ${channel.createdAt} with the ID of ${channel.id}`);
    if (channel.type === 'text') return channel.sendMessage('Channel successfully created!');
});
client.on('channelDelete', channel => {
    console.log(`Channel ${channel.name} was removed!`);
    client.channels.get('367117955697475584').sendMessage(`Channel ${channel.name} was successfully removed!`);
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
    if (err) console.error(err);
    console.log(`Loading a total of ${files.length} commands.`);
    files.forEach(f=> {
        let props = require(`./commands/${f}`);
        console.log(`Loading Command: ${props.help.name}. :)`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});

client.reload = function(command) {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./commands/${command}`)];
            let cmd = require(`./commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e){
          reject(e);
        }
    });
};

client.elevation = function(msg) {
  /* This function should resolve to an ELEVATION level which
     is then sent to the command handler for verification*/
     let permlvl = 0;
     let mod_role = msg.guild.roles.find('name', 'Moderator');
     if (mod_role && msg.member.role.has(mod_role.id)) permlvl = 2;
     let admin_role = msg.guild.roles.find('name', 'Admin');
     if (admin_role && msg.member.roles.has(admin_role.id)) permlvl = 3;
     if (msg.author.id === require('./config.json').ownerid) permlvl = 4;
     return permlvl;
};