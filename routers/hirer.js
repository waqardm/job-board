const express = require('express');
const router = express.Router();

const hirerController = require('../controllers/hirer');
const validator = require('../middlewares/validator');

router.get('/register', hirerController.getRegister);

router.get('/login', hirerController.getLogin);

router.post('/register', validator.registerValidator, hirerController.postRegister);


module.exports = router;