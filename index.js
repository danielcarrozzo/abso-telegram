require("dotenv").config();

const { Telegraf } = require('telegraf')
const bot = new Telegraf(process.env.TOKEN)

//Connection to the database
/*const { Pool } = require('pg');
const postgreSQLClient = new Pool({//Pool allows to have more queryes, client just one and then it has to be throw out: https://stackoverflow.com/questions/48751505/how-can-i-choose-between-client-or-pool-for-node-postgres
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
postgreSQLClient.connect();
const DatabaseUtilities = new require('./dbUtilities');
DatabaseUtilities.INSTANCE.setConnection(postgreSQLClient);
console.log("Database connected!");*/

bot.start((context) => {
    if(isRegisted(context.update.message.from.id)) {
        context.reply(`Rieccoti ${context.update.message.from.first_name}!`)
    }else{
        context.reply(`Ciao ${context.update.message.from.first_name}, sono qui per segnare la tua gestione finanziaria!`)
    }
    console.log(`${context.update.message.from.id} has started`)
})
/*bot.on('text', context=>{
    text=context.update.message.text
    context.reply('Hai scritto: '+text)
})*/
bot.command('movements', context=> {
    //query
})
bot.command('add', context=> {
    console.log(context)
    msg=context.update.message
    content=msg.text.split(' ');
    if(content.length>1){
        ammount=Number(content[1])
        if(ammount){
            if(content.length>2){
                comment=content.slice(2).join(' ');
                context.reply(`Ho aggiunto ${ammount} ai movimenti con commento ${comment}`);
            }else{
                context.reply(`Ho aggiunto ${ammount}`);
            }
        }else{
            context.reply(`L'importo inserito non è un numero o non hai utilizzato il '.' per indicare la parte decimale`)
        }
    }else{
        context.reply(`Non hai inserito alcun importo`)
    }
})
bot.launch()