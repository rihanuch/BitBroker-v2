const helpers = require('./helpers');

module.exports = {
	async getAll(req, res) {
		try {
      const markets = await helpers.getAll({});

      return res.send({
        status: 'success',
        body: markets && markets.length ? markets : []
      });
    } catch (error) {
      return res.status(400).send({
        status: 'failure'
      });
    }
  },
  async addNew(req, res) {
    try {
      await helpers.addNew(req.body);

      return res.send({
        status: 'success'
      });
    } catch (error) {
      return res.status(400).send({
        status: 'failure'
      });
    }
  },
  async deleteAll(req, res) {
    try {
      await helpers.deleteAll({})
      return res.send({
        status: 'success'
      })
    } catch (error) {
      return res.status(400).send({
        status: 'failure'
      });
    }
  }
};
