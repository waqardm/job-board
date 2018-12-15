const express = require('express');
const router = express.Router();

const hirerController = require('../controllers/hirer');
const validator = require('../middlewares/validator');

router.get('/register', hirerController.getRegister);

router.get('/login', hirerController.getLogin);

router.get('/dashboard', hirerController.getDashboard);

router.get('/profile', hirerController.getProfile);

router.post('/register', validator.registerValidator, hirerController.postRegister);

router.post('/login', validator.loginValidator, hirerController.postLogin);


module.exports = router;