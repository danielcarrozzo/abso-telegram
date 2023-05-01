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
            ctx.reply(`Inserisci la categoria:`);
            categoryAddScene.on('text', async (ctx) => {
                ctx.session.movementData.category = ctx.message.text;
                sceneFlow(ctx)
//                sceneFlow(ctx)
            });
            categoryAddScene.on('message', (ctx) => ctx.reply(`Sto aspettando una categoria`))
        });

        categoryAddScene.action('NO_CATEGORY_SITUATION', async (ctx) => {
            ctx.session.movementData.category = null;
            sceneFlow(ctx)
            //await sceneFlow(ctx)
        });


        return categoryAddScene
    }
}

module.exports = CategoryAddScene