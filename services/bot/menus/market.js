const marketHelpers = require('../../markets/helpers');

module.exports = {
    async markets() {
        const mkts = await marketHelpers.getForBot('_id name')
        const inline_keyboard = [];
        mkts.forEach(market => {
            inline_keyboard.push({
                text: market.name,
                callback_data: `market-${market._id}`
            })
        });
        return {reply_markup: {inline_keyboard: [inline_keyboard]}}
    },
    async market(marketId) {
        // use of (await...)[0] as getForBot returns a list with all the matches
        // by default we know that if we search by id we will only get one, which is the
        // corresponding to the callback_data id (marketId)
        const mkt = (await marketHelpers.getForBot('name currencies', ['currencies', ['name', 'symbol']], {_id: marketId}))[0]
        let marketCurrencies = `Monedas transadas en ${mkt.name}\n`.concat(...mkt.currencies.map((curr) => `- ${curr.name} (${curr.symbol})\n`))
        return marketCurrencies
    },
}