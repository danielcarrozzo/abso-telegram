const Telegraf  = require('telegraf')
const DatabaseUtilities = require("../utilities/dbUtilities")

add =
    async(args) =>{
        console.log(context)
        msg=context.update.message
        content=msg.text.split(' ');
        if(content.length>1){
            ammount=Number(content[1])//returns nan if it's not
            if(ammount){
                comment=''
                if(content.length>2){
                    comment=content.slice(2).join(' ');
                    await DatabaseUtilities.INSTANCE.addMovement(content[1], comment);
                    context.reply(`Ho aggiunto ${ammount} ai movimenti con commento ${comment}`);
                }else{
                    await DatabaseUtilities.INSTANCE.addMovement(content[1], comment);
                    context.reply(`Ho aggiunto ${ammount}`);
                }
            }else{
                context.reply(`L'importo inserito non è un numero o non hai utilizzato il '.' per indicare la parte decimale`)
            }
        }else{
            context.reply(`Non hai inserito alcun importo`)
        }

                //3) 32: 3\n
                try{//It's going to be always someone for every week, example: someone joins in 6th week? they are added 3 lines (or 8?)
                    const ranking=await DatabaseUtilities.INSTANCE.getRanking(args[0]);
                    //No promise but normal array TODO
                    await Promise.all(
                        ranking.map(async (row, index) => {
                            const user = await DiscordInterfaceUtilities.INSTANCE.getUser(row.discordid);//Previous version was faster with then but at first it has an error...
                            //check if it's admin or winner of a week so ()
                            console.log(user);
                            if(index%capability===0){// multiple messages
                                toSend='';
                            }
                            toSend += (index+1)+'. '+ user.username + ': ' + row.points + '\r\n';
                            if(index%capability===capability-1){
                                embed.addField(`Week: ${args[0]}`, toSend, false);
                                await channel.send(embed);
                                indexG=index;
                            }
                        })
                    );
                    embed.addField(`Week: ${args[0]}`, toSend, false);
                    await channel.send(embed);
                }catch(err){
                    throw err;
                }
            }else {
                return channel.send(`Week?`,{files: ["./media/iyahjbah.png"]});//No other ways
            }
        }else{
            return channel.send(`Too many arguments, you just need to put week number`);
        }
    }


module.exports = {
    name: 'add',
    description: 'Show ranking',
    execute: async function(msg, args) {
        await add(msg.channel, args);
    }
};