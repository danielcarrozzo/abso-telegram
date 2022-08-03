const { Telegraf }  = require('telegraf')

echo =
    async (ctx) =>{
        await ctx.reply("Ciao amo")
    }

/*module.exports = Composer.command(
    //name: 'ciao',
    //execute: echo
)*/

module.exports = Telegraf.command('echo', echo);