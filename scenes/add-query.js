const { Scenes, Markup }  = require('telegraf')// https://www.youtube.com/watch?v=tsBsVNNqs_U
const sceneFlowing = require('../utilities/scenes-tools');//I need it to import sceneFlow function
const DatabaseUtilities = require("../utilities/dbUtilities")
const TelegramInterfaceUtilities = require('../utilities/tgiUtilities');
let bot = TelegramInterfaceUtilities.INSTANCE.client
//TODO understand if add category is working, with the new function is working, divide the query and add it in the add command

class QueryAddScene{
    creator () {
        const queryAddScene = new Scenes.BaseScene('QUERY_ADD_SCENE');

        queryAddScene.enter(async (ctx) => {
            try{
                await DatabaseUtilities.INSTANCE.addMovement(ctx.session.userid, ctx.session.movementData.amount, ctx.session.movementData.category, ctx.session.movementData.comment);
                await sceneFlow(ctx)
            }catch(e){
                console.log(e)
            }
        });

        queryAddScene.leave((ctx) => {
            ctx.reply('Added correctly!');
        });

        return queryAddScene
    }
}

module.exports = QueryAddScene