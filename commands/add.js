const { Telegraf }  = require('telegraf')
//import { Markup } from 'telegraf'
const DatabaseUtilities = require("../utilities/dbUtilities")

const IN_ACTION=1
const OUT_ACTION=2

add =
    async (ctx) => {
        let ammount, category=''
        const scenarioTypeScene = new Scenes.BaseScene('SCENARIO_TYPE_SCENE_ID');

        scenarioTypeScene.enter((ctx) => {
            //ctx.session.myData = {};
            ctx.reply(`Hai un'entrata o un'uscita?`, Markup.inlineKeyboard([
                Markup.callbackButton('Entrata', IN_ACTION),
                Markup.callbackButton('Uscita', OUT_ACTION),
            ]).extra());
        });

        scenarioTypeScene.action(IN_ACTION, (ctx) => {
            ctx.reply(`Inserisci l'importo che hai in entrata (con il punto): `);
            //ctx.session.myData.preferenceType = 'Theater';
            if(Number(ctx.message.text)){
                ammount=Number(parseFloat(ctx.message.text).toFixed(2));
            }else{
                ctx.reply(`Non hai inserito un numero valido`);
                return//TODO
            }
            ctx.reply(`Vuoi aggiungere una categoria?`, Markup.inlineKeyboard([
                Markup.callbackButton('Aggiungi categoria', CATEGORY_SITUATION),
                Markup.callbackButton('Senza categoria', NO_CATEGORY_SITUATION),
            ]).extra());
            //return ctx.scene.enter('INSERT_IN'); // switch to some other scene
        });

        scenarioTypeScene.action(OUT_ACTION, (ctx) => {
            ctx.reply(`Inserisci l'importo che hai in uscita (con il punto): `);
            //ctx.session.myData.preferenceType = 'Theater';
            if(Number(ctx.message.text)){
                ammount=-Number(parseFloat(ctx.message.text).toFixed(2));
            }else{
                ctx.reply(`Non hai inserito un numero valido`);
                return
            }
            ctx.reply(`Vuoi aggiungere una categoria?`, Markup.inlineKeyboard([
                Markup.callbackButton('Aggiungi categoria', CATEGORY_SITUATION),
                Markup.callbackButton('Senza categoria', NO_CATEGORY_SITUATION),
            ]).extra());
        });

        scenarioTypeScene.action(CATEGORY_SITUATION, (ctx) => {
            category = ctx.message.text;
            ctx.reply(`Vuoi aggiungere un commento?`, Markup.inlineKeyboard([
                Markup.callbackButton('Commenta', COMMENT_SITUATION),
                Markup.callbackButton('Termina qua', NO_COMMENT_SITUATION),
            ]).extra());
        });

        scenarioTypeScene.action(NO_CATEGORY_SITUATION, (ctx) => {
            ctx.reply(`Vuoi aggiungere un commento?`, Markup.inlineKeyboard([
                Markup.callbackButton('Commenta', COMMENT_SITUATION),
                Markup.callbackButton('Termina qua', NO_COMMENT_SITUATION),
            ]).extra());
        });

        scenarioTypeScene.action(COMMENT_SITUATION, async (ctx) => {
            await DatabaseUtilities.INSTANCE.addMovement(userid, ammount, category, ctx.message.text);
            return ctx.scene.leave(); // exit global namespace
        });

        scenarioTypeScene.action(NO_COMMENT_SITUATION, async () => {
            await DatabaseUtilities.INSTANCE.addMovement(userid, ammount, category, '');
            return ctx.scene.leave(); // exit global namespace
        });

        scenarioTypeScene.leave((ctx) => {
            ctx.reply('Added correctly!');
        });

// What to do if user entered a raw message or picked some other option?
        scenarioTypeScene.use((ctx) => ctx.replyWithMarkdown('Please choose either Movie or Theater'));



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


module.exports = Telegraf.command('add', add);