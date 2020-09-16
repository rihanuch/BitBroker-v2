const express = require('express');
const router = express.Router();

const controller = require('./controller');
const prefix = 'positions';

router.get(`/${prefix}`, controller.getAll);
router.post(`/${prefix}`, controller.addNew);

module.exports = router;
