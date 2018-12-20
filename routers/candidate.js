const express = require('express');
const router = express.Router();

const candidateController = require('../controllers/candidate');
const validator = require('../middlewares/validator');
const authenticator = require('../middlewares/authenticator');

router.get('/register', candidateController.getRegister);

router.get('/login', candidateController.getLogin);

router.post('/register', validator.candidateRegisterValidator, candidateController.postRegister);

router.post('/login', validator.loginValidator, candidateController.postLogin);

router.post('/profile/edit', authenticator('candidate'), candidateController.postEditProfile);

router.get('/jobs', authenticator('candidate'), candidateController.getJobs);

module.exports = router;