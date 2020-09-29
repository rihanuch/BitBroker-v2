require('./model');
const mongoose = require('mongoose');
const Markets = mongoose.model('Markets');


module.exports = {
  async getAll() {
    return await Markets.find({})
      .populate('currencies', ['name', 'symbol'])
    // .populate('transactions')
  },
  async getForBot(fieldsStr, populateParams = [], findParams = {}) {
    return await Markets.find({ ...findParams }).select(`${fieldsStr}`)
      .populate(...populateParams)
  },
  async updateAggregate({ _id, currencies = [], transactions = [], positions = [] }) {
    return await Markets.update({ _id: _id }, {
      $addToSet: {
        currencies: currencies,
        transactions: transactions,
        positions: positions,
      }
    })
  },
  async addNew({ name, currencies }) {
    return await new Markets({ name, currencies }).save();
  },
  async deleteAll() {
    return await Markets.deleteMany({})
  }
};
