const TelegramInterfaceUtilities = new require('../utilities/tgiUtilities');
let bot = TelegramInterfaceUtilities.INSTANCE.client

echo =
    async (ctx) =>{
        await ctx.reply("Ciao amo")
    }

/*module.exports = Composer.command(
    //name: 'ciao',
    //execute: echo
)*/

module.exports = bot.command('echo', echo);