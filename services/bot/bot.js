const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)
bot.telegram.setWebhook(process.env.WEBHOOK_URL)

bot.command('start', (ctx) => {console.log(ctx.update.message); ctx.reply(`Hola, ${ctx.update.message.from.first_name}. Actualmente me encuentro en construcción, pero mantente atento 😄!`)})
bot.command('help', (ctx) => ctx.reply('Try send a sticker!'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.launch()

module.exports = bot;