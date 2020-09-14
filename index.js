
const fs = require('fs');
const Discord = require('discord.js');
const {prefix} = require('./config.json');
const keepAlive = require('./server.js');
require('dotenv').config();

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

var found = require('./mention.js');

//bot start
client.once('ready', () =>{
    console.log('Online ako!');
})


//VARIABLES - yung mga nasa gilid yun yung sa testing server

var allowedRole = 'Admin'; //Malakas   /Admin
var encounterChannel = '752692817264115813';//752665821095919718   /752692817264115813


/* di na muna kailangan
global.pokeChannel = [
    '750684602787561493', //750684602787561493
    '751123428018225155' //751123428018225155
];
*/

//commands
client.on('message', message=>{
    
    //prefix check
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    //argument and command check
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    if(!client.commands.has(commandName)) return;
    
    const command = client.commands.get(commandName);
    
    //role check
    if(command.roleLock && !message.member.roles.cache.some(r => r.name == allowedRole)){
            return message.channel.send('Wala kang role na Admin');
    }

    //guild only check
    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }
    
    //argument check
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage){
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }
    
    //execute or send error
    try {

        if(command.execute(message, args, client)){
            found = require('./mention.js');
        }
        
    } catch (error){
        console.error(error);
        message.channel.send('Error command');
    }
    
    
});


//bot mention
client.on('message',message=>{

    if (message.mentions.has(client.user,options={ignoreRoles:true,ignoreEveryone:true})) {  

        let argSize = message.content.split(/ +/);
        let arg = message.content;
        
        if(argSize.length>1){
    
            if(!found.found(message , arg)){
                message.channel.send('No Comment');
            }
    
        }else{message.channel.send('baket');}
        
    }
    

});


//star react
client.on('messageReactionAdd', message=>{
    if(message.count==1 && message.emoji.name=='✨'){
        let color = message.message.embeds[0].color;
        console.log(color);
        if(color == '10487800' || color == '16751052'){
            try{
            let user = message.users.cache.map(m=>m.username);
            let gifLink = message.message.embeds[0].image.url;
            let description = message.message.embeds[0].description;
            let author = message.message.embeds[0].author.name;
            let icon = message.message.embeds[0].author.iconURL;
            let channel = message.message.channel.id;
            let msgLink = message.message.url;

            let embed = new Discord.MessageEmbed()
                .setColor(color)
                .setAuthor(author,icon)
                .setDescription(description)
                .setImage(gifLink)
                .addField('** **','[Jump to Message]('+msgLink+')')
                .setFooter('Encountered at')
                .setTimestamp();

            client.channels.cache.get(encounterChannel)
                .send('**'+user+'** starred a rare encounter \n The rare pokemon was encountered in <#'+channel+'>',embed)
                .then(message=>{
                    message.react('🎉')
                }).catch(error=>{console.log(error)});

            }catch(error){
                console.log(error);
            }

        }


    }
    //console.log(message.count);
});




keepAlive();
client.login(process.env.TOKEN);
