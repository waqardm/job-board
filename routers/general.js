const express = require('express');
const router = express.Router();

const generalController = require('../controllers/general');

router.get('/', generalController.getIndex);
<<<<<<< HEAD
=======
router.get('/about', generalController.getAbout);
router.get('/community', generalController.getCommunity);
router.get('/contact', generalController.getContact);
router.get('/register', generalController.getRegister);
router.get('/login', generalController.getLogin);
>>>>>>> waqar

module.exports = router;