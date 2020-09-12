module.exports = {
    name: 'unmute',
    description: 'Unmute channel',
    guildOnly: true,
    roleLock:true,
    execute(message, args){
        message.channel.updateOverwrite(message.guild.roles.everyone, {SEND_MESSAGES: null});
        message.channel.send('Magingay na kayo');
    },
};