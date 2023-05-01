const { Scenes, Markup }  = require('telegraf')// https://www.youtube.com/watch?v=tsBsVNNqs_U
const sceneFlowing = require('../utilities/scenes-tools');//I need it to import sceneFlow function
const TelegramInterfaceUtilities = require('../utilities/tgiUtilities');
let bot = TelegramInterfaceUtilities.INSTANCE.client

kindInlineKeyboard = (ctx) =>
    ctx.reply(`Hai un'entrata o un'uscita?`, Markup.inlineKeyboard([
        Markup.button.callback('Entrata', 'IN_ACTION'),
        Markup.button.callback('Uscita', 'OUT_ACTION')
    ]))

class AmountAddScene{
    creator () {

        const amountAddScene = new Scenes.BaseScene('AMOUNT_ADD_SCENE');

        amountAddScene.enter(async (ctx) => {
            await kindInlineKeyboard(ctx)
        });

        amountAddScene.action('IN_ACTION', async (ctx) => {
            ctx.reply(`Inserisci l'importo che hai in entrata (con il punto): `);
            amountAddScene.on('text', async (ctx) => {
                if(Number(ctx.message.text)){
                    console.log('ciao')
                    ctx.session.movementData.amount = Number(parseFloat(ctx.message.text).toFixed(2));
                    sceneFlow(ctx)
                    //sceneFlow(ctx)
                }else{
                    console.log('ciao2')
                    ctx.reply(`Non hai inserito un numero valido`);
                    await ctx.scene.reenter()//ma in realtà forse non serve
                }
            });
            bot.on('message', (ctx) => ctx.reply(`Sto aspettando un numero...`))
        });

        amountAddScene.action('OUT_ACTION', async (ctx) => {
            ctx.reply(`Inserisci l'importo che hai in uscita (con il punto): `);
            amountAddScene.on('text', async (ctx) => {
                if(Number(ctx.message.text)){
                    ctx.session.movementData.amount=-Number(parseFloat(ctx.message.text).toFixed(2));
                    sceneFlow(ctx)
                    //await sceneFlow(ctx)
                }else{
                    ctx.reply(`Non hai inserito un numero valido`);
                    await ctx.scene.reenter()//ma in realtà forse non serve
                }
            });
        });

        return amountAddScene
    }
}

module.exports = AmountAddScene