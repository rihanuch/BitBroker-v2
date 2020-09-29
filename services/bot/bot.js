const { Telegraf } = require('telegraf');
const textReplies = require('./commands')
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)
bot.telegram.setWebhook(process.env.WEBHOOK_URL)

bot.command('start', (ctx) => ctx.reply(textReplies.start(ctx)));
bot.command('register', (ctx) => ctx.reply(textReplies.register(ctx)));
bot.command('markets', async (ctx) => ctx.reply('Mercados soportados', await textReplies.markets(ctx)));
bot.action(/market-[a-z0-9]+/, async (ctx) => ctx.reply(await textReplies.market(ctx)));
bot.on('text', async (ctx) => ctx.reply(await textReplies.text(ctx)))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.launch()

module.exports = bot;