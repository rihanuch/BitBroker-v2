const express = require('express');
const router = express.Router();

const controller = require('./controller');
const prefix = 'markets';

router.get(`/${prefix}`, controller.getAll);
router.post(`/${prefix}`, controller.addNew);
router.patch(`/${prefix}`, controller.updateAggregate);
router.delete(`/${prefix}`, controller.deleteAll);

module.exports = router;
