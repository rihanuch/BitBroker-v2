require('./model');

const mongoose = require('mongoose');
const Markets = mongoose.model('Markets');

module.exports = {
  async getAll() {
    return await Markets.find({})
      .populate('currencies', ['name', 'symbol'])
      // .populate('transactions')
  },
  async addNew({ name, currencies }) {
    return await new Markets({ name, currencies }).save();
  },
  async deleteAll() {
    return await Markets.deleteMany({})
  }
};
