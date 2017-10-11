module.exports = member => {
    let guild = member.guild;
    guild.client.channels.get('367117955697475584').sendMessage(`Please welcome ${member.user} to the server!`);
};