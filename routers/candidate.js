const express = require('express');
const router = express.Router();

const candidateController = require('../controllers/candidate');
const validator = require('../middlewares/validator');

router.get('/register', candidateController.getRegister);

router.get('/login', candidateController.getLogin);

router.get('/dashboard', candidateController.getDashboard);

router.post('/register', validator.registerValidator, candidateController.postRegister);

router.post('/login', validator.loginValidator, candidateController.postLogin);



module.exports = router;