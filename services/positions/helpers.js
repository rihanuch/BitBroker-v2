require('./model');

const mongoose = require('mongoose');
const Positions = mongoose.model('Positions');
const Users = mongoose.model('Users');
const Markets = mongoose.model('Markets')

module.exports = {
  async getAll() {
    return await Positions.find({});
  },
  async addNew({ user, market, transaction, desiredReturn }) {
    const mkt = await Markets.findById(market);
    const usr = await Users.findById(user);
    const position = await new Positions({ user, market, transaction, desiredReturn }).save();

    usr.positions.push(position);
    await usr.save();
    mkt.positions.push(position);
    return mkt.save();
  }
};
