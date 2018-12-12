const express = require('express');
const router = express.Router();

const generalController = require('../controllers/general');

router.get('/', generalController.getIndex);

module.exports = router;