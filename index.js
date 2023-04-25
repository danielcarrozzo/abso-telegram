/*import dotenv from 'dotenv' //I need to use import or I cannot import scenes in add, I added "type":"module" in package.json
dotenv.config();

import fs from 'fs'
import Telegraf from 'telegraf'
const bot = new Telegraf(process.env.TOKEN)

//Connection to the database
import Pool from 'pg'
* */

require("dotenv").config();

const fs = require('fs');

const { session, Scenes, Markup, Telegraf} = require('telegraf')

const bot = new Telegraf(process.env.TOKEN)
const TelegramInterfaceUtilities = new require('./utilities/tgiUtilities');
TelegramInterfaceUtilities.INSTANCE.setClient(bot);

//Connection to the database
const { Pool } = require('pg');
const postgreSQLClient = new Pool({//Pool allows to have more queryes, client just one and then it has to be throw out: https://stackoverflow.com/questions/48751505/how-can-i-choose-between-client-or-pool-for-node-postgres
    connectionString: process.env.DATABASE_URL,
    ssl: false
/*{
    rejectUnauthorized: false
}*/
});

postgreSQLClient.connect()
.then(() => console.log("Database connected!"))
.catch(e => console.log)
const DatabaseUtilities = new require('./utilities/dbUtilities');
DatabaseUtilities.INSTANCE.setConnection(postgreSQLClient);

//bot.use(session) //boh perché la devo marcare così?

bot.use((ctx, next) => {
    //console.log(ctx)
    if(Object.keys(ctx.message).includes('text')){
        //bot.telegram.sendMessage(-723817505, ctx.from.username + " said: " + ctx.message.text)
        console.log(ctx.from.username + " said: " + ctx.message.text)
    } else {
        //bot.telegram.sendMessage(-723817505, ctx.from.username + " sent " + Object.keys(ctx.message).at(4))
        console.log(ctx.from.username + " sent " + Object.keys(ctx.message).at(4))
    }
    return next()
})

//Commands adding
//They are already added embedded in Telegram, not as Discord where you have to declare them in the code
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));//This next step is how you'll dynamically retrieve all your newly created command files. Add this below your client.commands line:
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.use(command)
    // bot.command(command.name, ctx => { //Non so perché non funzioni ma ok, guardare moduel export echo.js
    //     command.execute(ctx);
    // })
}

//Scenes adding
let scenes=[]
const sceneFiles = fs.readdirSync('./scenes').filter(file => file.endsWith('.js'));//This next step is how you'll dynamically retrieve all your newly created command files. Add this below your client.commands line:
for (const file of sceneFiles) {
    const scene = require(`./scenes/${file}`);
    scenes.push(scene)
    console.log(scene)
}
const stage = new Scenes.Stage(scenes)
console.log(stage)
bot.use(session());// to  be precise, session is not a must have for Scenes to work, but it sure is lonely without one
bot.use(stage.middleware());

bot.start(async (ctx) => {
    if(await DatabaseUtilities.INSTANCE.isRegisted(ctx.update.message.from.id)) {
        ctx.reply(`Rieccoti ${ctx.update.message.from.first_name}!`)
    }else{
        userId=DatabaseUtilities.INSTANCE.addUser(ctx.update.message.from.id)
        ctx.reply(`Ciao ${ctx.update.message.from.first_name}, sono qui per segnare la tua gestione finanziaria!\n
                    Nel caso in cui ti servisse assistenza il tuo userId è questo: ${userId}`)
    }
    console.log(`${ctx.update.message.from.id} has started`)
})

bot.launch()