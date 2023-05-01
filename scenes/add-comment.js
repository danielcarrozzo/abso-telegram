const { Scenes, Markup }  = require('telegraf')// https://www.youtube.com/watch?v=tsBsVNNqs_U
const sceneFlowing = require('../utilities/scenes-tools');//I need it to import sceneFlow function
const TelegramInterfaceUtilities = require('../utilities/tgiUtilities');
let bot = TelegramInterfaceUtilities.INSTANCE.client

commentInlineKeyboard = (ctx) =>
    ctx.reply(`Vuoi aggiungere un commento?`, Markup.inlineKeyboard([
        Markup.button.callback('Commenta', 'COMMENT_SITUATION'),
        Markup.button.callback('Termina qua', 'NO_COMMENT_SITUATION'),
    ]))

//TODO understand if add category is working, with the new function is working, divide the query and add it in the add command

class CommentAddScene{
    creator () {
        const commentAddScene = new Scenes.BaseScene('COMMENT_ADD_SCENE');
        
        commentAddScene.enter(async (ctx) => {
            commentInlineKeyboard(ctx);
        });

        commentAddScene.action('COMMENT_SITUATION', async (ctx) => {
            ctx.reply(`Inserisci il commento:`);
            commentAddScene.on('text', async (ctx) => {
                ctx.session.movementData.comment = ctx.message.text
                sceneFlow(ctx) // exit global namespace
            });
            commentAddScene.on('message', (ctx) => ctx.reply(`Sto aspettando un commento`))
        });

        commentAddScene.action('NO_COMMENT_SITUATION', async (ctx) => {
            ctx.session.movementData.comment = null
            sceneFlow(ctx) // exit global namespace
        });

        return commentAddScene
    }
}

module.exports = CommentAddScene