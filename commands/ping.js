
module.exports = {
	name: 'ping',
    description: 'Information about the arguments provided.',
    guildOnly: true,
    args: true,
    roleLock:true,
    usage: '<argument>',
	execute(message, args) {
        if ( args[0] === 'foo'){
            
		}

		message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
	},
};