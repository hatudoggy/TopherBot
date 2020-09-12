const { prefix } = require('../config.json');
const Discord = require('discord.js');
module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	usage: 'help, help {command_name}',
	execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if(!args.length){
            data.push(commands.map(command=>'`'+prefix+command.name+'`').join(' '));
            const help = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Listahan ng commands ni TopherBot')
                .setDescription('Type `_help command_name` para wala lang')
                .addField('Commands', data)
                .setFooter('TopherBot');

            message.channel.send(help);
            //console.log(data);
        }else{
            let name = args[0].toLowerCase();
            let command = commands.get(name) || commands.find(c=>c.aliases&&c.aliases.includes(name));
            if(!command){
                return message.channel.send('walang command na ganyan');
            }


            const helpCommand = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(command.name+' Command')
                .setDescription('**Description**: '+command.description+'\n**Aliases**: '+command.aliases+'\n**Usage**: '+command.usage)
                .setFooter('TopherBot');

            message.channel.send(helpCommand);

        }
	},
};