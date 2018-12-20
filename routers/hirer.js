const express = require('express');
const router = express.Router();
const authenticator = require("../middlewares/authenticator");

const hirerController = require('../controllers/hirer');
const validator = require('../middlewares/validator');

router.get('/register', hirerController.getRegister);

router.get('/login', hirerController.getLogin);

router.post('/register', validator.hirerRegisterValidator, hirerController.postRegister);

router.post('/login', validator.loginValidator, hirerController.postLogin);

router.get('/job/add', authenticator('hirer'), hirerController.getAddJob);

router.post('/job/add', authenticator('hirer'), validator.addJobValidator, hirerController.postAddJob);

router.get('/job/edit', authenticator('hirer'), hirerController.getEditJob);

router.get('/my_jobs', authenticator('hirer'), hirerController.getMyJobs);

module.exports = router;