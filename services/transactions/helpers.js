require('./model');

const mongoose = require('mongoose');
const Transactions = mongoose.model('Transactions');
const Markets = mongoose.model('Markets');
const Users = mongoose.model('Users');


module.exports = {
  async getAll() {
    return await Transactions.find({})
    .populate('user', ['name'])
    .populate('market', ['name'])
    .populate('currency.from', ['name', 'symbol'])
    .populate('currency.to', ['name', 'symbol'])
  },
  async addNew({ action, user, market, currency, amount }) {
    console.log(market)
    const usr = await Users.findById(user);
    const mkt = await Markets.findById(market);
    const transaction = await new Transactions({ action, user, market, currency, amount }).save()
    
    usr.transactions.push(transaction);
    await usr.save();
    mkt.transactions.push(transaction);
    return await mkt.save();
  }
};
