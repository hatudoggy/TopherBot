
const fs = require('fs');
const text = fs.readFileSync('./pokemonNL.txt', "utf-8");
const text2 = fs.readFileSync('./pokemonL.txt', "utf-8");

var pokeList = text.split('\n');
var pokeListL = text2.split('\n');
var roleMention = '<@&749670916408999957>'; //<@&751834241867972688>   /<@&749670916408999957>
var announceChannel = '751090613587542147'; //751123451212988466   /751090613587542147
var pokemon = 'wala';
var huntStart = false;

module.exports = {
    name: 'hunt',
    description: 'Pokemon hunt event',
    guildOnly: true,
    roleLock:true,
    execute(message, args, client){
      
        if ( args[0] === 'start'){
            if(pokemon == 'wala'){
                message.channel.send('Walang pokemon na ihuhunt, set ka ng pokemon');
            }else {
                //ibahin yung mention id pag lilipat
                message.channel.send(roleMention+' Simula na yung hunt. Unang makakuha ng **'+pokemon+'** siya panalo');
                console.log('start hunting');
                pokeHunt();
            }

        }else if( args[0] === 'end'){
          
          if(huntStart){
            pokeHuntOff();
            message.channel.send('Hunt ended on command');
          }else{
            message.channel.send('Hunt not active');
          }

        }else if( args[0] === 'set'){

            if(args[1] === 'random'){
                pokemon = pokeList[Math.floor(Math.random()*pokeList.length)];
            }else if(args[1] === 'randomL'){
                pokemon = pokeListL[Math.floor(Math.random()*pokeListL.length)];
            }else{
                if(args[2]=== 'shiny'){
                    pokemon = 'Shiny '+args[1];
                }else{pokemon = args[1];}
            }

            message.channel.send('Hunt set to: '+pokemon);

        }else if( args[0] === 'hatdog'){
            //console.log(pokemon);
            hatdugan();
            //console.log(pokeList.length);
            //console.log(cmd[0]);
            //console.log(process.env.TOKEN);
        }


      //hunt start
      pokeHunt = () =>{
          huntStart = true;
          console.log(pokemon);
          client.on('messageUpdate',listener = message=>{
              if(message.author.bot){
              var findings = message.embeds[0].description;
              //console.log(message.embeds);//
              try{
                  if(findings.includes('You caught a **'+pokemon+'**')){
                      //function here
                      console.log(findings);
                      pokemon = 'wala';
                      let para = message.content;
                      getSentence = (word, text)=>{
                          let sentenceArray = text.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
                          return sentenceArray.filter(sentence => sentence.includes(word));
                      }
                      let msg = getSentence('wild',para).toString();
                      let name = msg.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/g).map(w => w.split(/((\b[^\s]+\b)((?<=\.\w).)?)/g)[1]);
                      pokeHuntOff();
                      client.channels.cache.get(announceChannel).send(roleMention+' Si **'+name+'** nanalo sa hunt!🎉🎉');
                      console.log('May nanalo na sa hunt');
                      /*
                      for (let i = 0; i < pokeServer.length; i++){
                      client.channels.cache.get(pokeChannel[i]).send('May nakakuha na sa hunt!');
                      }
                      */
                  }
              }catch(error){console.log(error.message)}

              }
          })
      }

      //hunt end
      pokeHuntOff = () =>{
          client.off('messageUpdate',listener);
          console.log('hunt has ended');
          huntStart = false;

      }

      //testing function
      hatdugan = () =>{
        console.log(process.env.TOKEN);
      }
        
        

    }
};




