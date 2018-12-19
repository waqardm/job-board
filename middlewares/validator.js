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

module.exports.loginValidator = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid Email'),
]

module.exports.addJobValidator = [
    body('positionAvailable')
        .not()
        .isEmpty()
        .withMessage('Position Available Cannot be empty'),
    body('salary')
        .not()
        .isEmpty()
        .isNumeric()
        .withMessage('Salary should be a number'),
    body('location')
        .not()
        .isEmpty()
        .withMessage('Location Cannot be empty'),
    body('aboutTheRole')
        .not()
        .isEmpty()
        .withMessage('About the role Cannot be empty'),
    body('candidateDetails')
        .not()
        .isEmpty()
        .withMessage('Candidate Details Cannot be empty'),
]