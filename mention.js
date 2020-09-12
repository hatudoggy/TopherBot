//bot mention keywords and reply
module.exports = {
found(message, arg){
    var cmd = [
        {
            keywords: ['gaano','kalaki'],
            action: () => {
                let answer = 'Kasing laki mo';
                return answer;
            }
        },
        {
            keywords: ['pakyu'],
            action: () => {
                let answer = 'Pakyu din';
                return answer;
            }
        },
        {
            keywords: ['sino','malakas'],
            action: () => {
                let answer = 'Ako pinakamalakas';
                return answer;
            }
        },
        {
            keywords: ['bano','ka'],
            action: () => {
                let answer = 'Ikaw yung bano';
                return answer;
            }
        },
        {
            keywords: ['tang','ina'],
            action: () => {
                let answer = 'Tang ina mo din';
                return answer;
            }
        },
        {
            keywords: ['tangina'],
            action: () => {
                let answer = 'Tang ina mo din';
                return answer;
            }
        },
        {
            keywords: ['gago'],
            action: () => {
                let answer = 'Minumura ba kitang hayop ka?';
                return answer;
            }
        },
        {
            keywords: ['ulol'],
            action: () => {
                let answer = 'Ka';
                return answer;
            }
        }
    ];

    for (let i = 0; i < cmd.length; i++){
        if(cmd[i].keywords.every(el=> arg.includes(el))){
            message.channel.send(cmd[i].action());
            return true;
            
        }
    }
}

}
