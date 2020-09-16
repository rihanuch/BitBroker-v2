const express = require('express');
const router = express.Router();
const bot = require('./bot')
const prefix = 'bot';

router.post(`/${prefix}`, bot.webhookCallback('/bot'));

module.exports = router;
