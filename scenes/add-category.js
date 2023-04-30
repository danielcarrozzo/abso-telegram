const { Scenes, Markup }  = require('telegraf')// https://www.youtube.com/watch?v=tsBsVNNqs_U
const sceneFlowing = require('../utilities/scenes-tools');//I need it to import sceneFlow function
const TelegramInterfaceUtilities = require('../utilities/tgiUtilities');
let bot = TelegramInterfaceUtilities.INSTANCE.client

categoryInlineKeyboard = (ctx) =>
    ctx.reply(`Vuoi aggiungere una categoria?`, Markup.inlineKeyboard([
        Markup.button.callback('Aggiungi categoria', 'CATEGORY_SITUATION'),
        Markup.button.callback('Senza categoria', 'NO_CATEGORY_SITUATION'),
    ]))

class CategoryAddScene{
    creator () {

        const categoryAddScene = new Scenes.BaseScene('CATEGORY_ADD_SCENE');

        categoryAddScene.enter(async (ctx) => {
            categoryInlineKeyboard(ctx);
        });

        categoryAddScene.action('CATEGORY_SITUATION', async (ctx) => {
            console.log('ciao3')
            ctx.reply(`Inserisci la categoria:`);
            bot.on('text', async (ctx) => {
                console.log('ciao4')
                ctx.session.movementData.category = ctx.message.text;
                await ctx.scene.enter(`COMMENT_ADD_SCENE`)
//                sceneFlow(ctx)
            });
            bot.on('message', (ctx) => ctx.reply(`Sto aspettando una categoria`))
        });

        categoryAddScene.action('NO_CATEGORY_SITUATION', async (ctx) => {
            console.log('ciao5')
            ctx.session.movementData.category = null;
            await ctx.scene.enter(`COMMENT_ADD_SCENE`)
            //await sceneFlow(ctx)
        });


        return categoryAddScene
    }
}

module.exports = CategoryAddScene