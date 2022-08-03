const Telegraf  = require('telegraf')
const DatabaseUtilities = require("../utilities/dbUtilities")

movements =
    async(args) =>{
        console.log(context)
        msg = context.update.message
        content = msg.text.split(' ');
        //See if try catch are necessary
        if(content.length>1){
            // if(){
            //
            // }
            userid = await DatabaseUtilities.INSTANCE.getUserId(msg.from.id);
            if(ammount){
                comment=''
                if(content.length>2){
                    comment=content.slice(2).join(' ');
                    await DatabaseUtilities.INSTANCE.addMovement(userid, content[1], content[2], comment);
                    context.reply(`Ho aggiunto ${ammount} ai movimenti con commento ${comment}`);
                }else{
                    await DatabaseUtilities.INSTANCE.addMovement(userid, content[1], category, comment);
                    context.reply(`Ho aggiunto ${ammount}`);
                }
            }else{
                context.reply(`L'importo inserito non è un numero o non hai utilizzato il '.' per indicare la parte decimale`)
            }
            context.reply(`Non hai inserito alcun importo`)
        }else{
        }
        // if(){
        //     context.reply(`Non hai inserito alcun importo`)
        // }else{
        //     //Do split message with buttons and listener for query with 50 splitter in db, new fuction in dbutilities is required or i send all to the bot and then it manages it by itself
        // }
    }


module.exports = {
    name: 'movements',
    execute: async function(msg, args) {
        await movements(msg.channel, args);
    }
};