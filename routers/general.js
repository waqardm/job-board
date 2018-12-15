const express = require('express');
const router = express.Router();

const generalController = require('../controllers/general');
const authenticator = require('../middlewares/authenticator');

router.get('/', generalController.getIndex);
router.get('/about', generalController.getAbout);
router.get('/community', generalController.getCommunity);
router.get('/contact', generalController.getContact);
router.post('/logout', generalController.postLogout);
router.get('/dashboard', authenticator(), generalController.getDashboard);
router.get('/profile', authenticator(), generalController.getProfile);

module.exports = router;