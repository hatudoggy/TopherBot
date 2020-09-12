module.exports = {
    name: 'mute',
    description: 'Mute channel',
    usage:'mute',
    guildOnly: true,
    roleLock:true,
    execute(message, args){
            message.channel.updateOverwrite(message.guild.roles.everyone, {SEND_MESSAGES: false});
            message.channel.send('Bawal na magsalita, naka mute channel');
    },
};
