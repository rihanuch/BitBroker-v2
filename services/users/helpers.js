require('./model');

const mongoose = require('mongoose');
const Users = mongoose.model('Users');

module.exports = {
  async getAll() {
    return await Users.find({});
  },
  async addNew({ telegramId, name, password }) {
    return await new Users({ telegramId, name, password }).save();
  },
  async deleteAll() {
    return await Users.deleteMany({})
  }
};
