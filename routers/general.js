const express = require('express');
const router = express.Router();

const generalController = require('../controllers/general');

router.get('/', generalController.getIndex);
router.get('/about', generalController.getAbout);
router.get('/community', generalController.getCommunity);
router.get('/contact', generalController.getContact);
router.post('/logout', generalController.postLogout);

//temp
router.get('/dashboard', generalController.dashboard);

module.exports = router;