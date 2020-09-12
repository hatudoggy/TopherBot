module.exports = {
    name: 'pbb',
    description: 'bahay ni kuya',
    usage:'pbb invite {username}, pbb kick {username}',
    guildOnly: true,
    execute(message, args, client){
        if(args[0] == 'invite'){
            if(args[1]){
                try{
                let role = message.guild.roles.cache.find(role=>role.name=='PinoyHousemate');
                //let member = message.mentions.members.first();
                let member = message.guild.members.cache.find(user=>user.user.username==args[1]);
                member.roles.add(role);
                message.channel.send('Welcome sa bahay ni kuya');
                }catch(error){
                    message.channel.send('Di tama yung pangalan o wala dito yun');
                }

            }else{
                message.channel.send('Wala ka nilagay na tamang mention');
            }

        }else if(args[0] == 'kick'){
            if(args[1]){
                try{
                    let role = message.guild.roles.cache.find(role=>role.name=='PinoyHousemate');
                    //let member = message.mentions.members.first();
                    let member = message.guild.members.cache.find(user=>user.user.username==args[1]);
                    member.roles.remove(role);
                    message.channel.send('Layas na gago');
                    }catch(error){
                        message.channel.send('Di tama yung pangalan o wala dito yun');
                    }
            }else{
                message.channel.send('Wala ka nilagay na tamang mention');
            }
        }

    },
};
