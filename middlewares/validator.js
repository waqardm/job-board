const { body } = require('express-validator/check');

module.exports.registerValidator = [
    body('firstName')
        .not()
        .isEmpty()
        .withMessage('First Name is Required'),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid Email'),
    body('password')
        .isLength({min : 5})
        .withMessage('Password is too Short'),
    body('confirmPassword')
        .custom((value, { req }) => {
            if(value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
]