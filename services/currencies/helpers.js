require('./model');

const mongoose = require('mongoose');
const Currencies = mongoose.model('Currencies');

module.exports = {
  async getAll() {
    return await Currencies.find({});
  },
  async addNew({ name, symbol }) {
    return await new Currencies({ name, symbol }).save();
  }
};
