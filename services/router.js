const express = require('express');
const router = express.Router();

// Registered entity routes
router.use(require('./users/router'));
router.use(require('./currencies/router'));
router.use(require('./markets/router'));
router.use(require('./positions/router'));
router.use(require('./transactions/router'));

module.exports = router;
