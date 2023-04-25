const { Telegraf, session, Scenes, Markup }  = require('telegraf')// https://www.youtube.com/watch?v=tsBsVNNqs_U
const DatabaseUtilities = require("../utilities/dbUtilities")
const TelegramInterfaceUtilities = new require('../utilities/tgiUtilities');

const IN_ACTION='text'
const OUT_ACTION='text'
const CATEGORY_SITUATION='text'
const NO_CATEGORY_SITUATION='text'
const COMMENT_SITUATION='text'
const NO_COMMENT_SITUATION='text'

let ammount, category=''
const scenarioTypeScene = new Scenes.BaseScene('SCENARIO_TYPE_SCENE_ID');

let bot = TelegramInterfaceUtilities.INSTANCE.client

console.log("I'm adding add-scene to the scenes")

scenarioTypeScene.enter((ctx) => {
    //ctx.session.myData = {};
    console.log('fghh');
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

module.exports = scenarioTypeScene