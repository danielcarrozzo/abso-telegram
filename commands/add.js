const { session, Scenes, Markup }  = require('telegraf')// https://www.youtube.com/watch?v=tsBsVNNqs_U
const DatabaseUtilities = require("../utilities/dbUtilities")
const TelegramInterfaceUtilities = new require('../utilities/tgiUtilities');
let bot = TelegramInterfaceUtilities.INSTANCE.client

add =
    async (ctx) => {

        // Or send your question manually (make sure to use a parse_mode and force_reply!)
//        bot.command('unicorn', async ctx => ctx.replyWithMarkdown('What are unicorns doing?' + addingQuestion.messageSuffixMarkdown(), {parse_mode: 'Markdown', reply_markup: {force_reply: true}})
//        bot.command('unicorn', async ctx => ctx.replyWithHTML(    'What are unicorns doing?' + addingQuestion.messageSuffixHTML(),     {parse_mode: 'HTML',     reply_markup: {force_reply: true}})


        //import { Scenes } from 'telegraf'

        //https://stackoverflow.com/questions/55749437/stage-enter-doesnt-start-the-wizard`

        //ctx.scene.enter('SCENARIO_TYPE_SCENE_ID')

        //bot.use(session()); // to  be precise, session is not a must have for Scenes to work, but it sure is lonely without one
//        bot.use(stage.middleware());

//        ctx.scene.enter('SCENARIO_TYPE_SCENE_ID')
// What to do if user entered a raw message or picked some other option?
        /*scenarioTypeScene.use((ctx) => {
            console.log('ciao');
            ctx.reply('Hi');
            ctx.replyWithMarkdown('Please choose either Movie or Theater')
        });*/



        /*content = msg.text.split(' ');
        //ctx.reply(`Invia un quantitativo di denaro`);
        if(content.length>1){
            userid = await DatabaseUtilities.INSTANCE.getUserId(msg.from.id);
            ammount = Number(content[1])//returns nan if it's not
            if(ammount){
                if(content.length===2){
                    comment=content.slice(2).join(' ');
                    await DatabaseUtilities.INSTANCE.addMovement(userid, content[1], content[2], comment);
                    ctx.reply(`Ho aggiunto ${ammount} ai movimenti con commento ${comment}`);
                }else{
                    await DatabaseUtilities.INSTANCE.addMovement(userid, content[1], '', comment);
                    ctx.reply(`Ho aggiunto ${ammount}`);
                }
            }else{
                ctx.reply(`L'importo inserito non è un numero o non hai utilizzato il '.' per indicare la parte decimale`)
            }
        }else{
            ctx.reply(`Non hai inserito alcun importo`)
        }*/
    }


module.exports = bot.command('add', (ctx) => ctx.scene.enter('SCENARIO_TYPE_SCENE_ID'));