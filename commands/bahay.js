module.exports = {
    name: 'pbb',
    description: 'bahay ni kuya',
    guildOnly: true,
    execute(message, args){
        if(args[0] == 'invite'){
            if(message.mentions.users.size){
                try{
                let role = message.guild.roles.cache.find(role=>role.name=='Hypebeast');
                let member = message.mentions.members.first();
                member.roles.add(role);
                message.channel.send('Welcome sa bahay ni kuya');
                }catch(error){
                    message.channel.send('Di tama yung pangalan o wala dito yun');
                }

            }else{
                message.channel.send('Wala ka nilagay na tamang mention');
            }

        }else if(args[0] == 'kick'){
            if(message.mentions.users.size){
                try{
                    let role = message.guild.roles.cache.find(role=>role.name=='Hypebeast');
                    let member = message.mentions.members.first();
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
