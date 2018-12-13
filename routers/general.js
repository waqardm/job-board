const express = require('express');
const router = express.Router();

const generalController = require('../controllers/general');

router.get('/', generalController.getIndex);
router.get('/about', generalController.getAbout);
router.get('/community', generalController.getCommunity);
router.get('/contact', generalController.getContact);
router.get('/candidate/register', generalController.getCandidateRegister);
router.get('/hirer/register', generalController.getHirerRegister);
router.get('/candidate/login', generalController.getCandidateLogin);
router.get('/hirer/login', generalController.getHirerLogin);

module.exports = router;