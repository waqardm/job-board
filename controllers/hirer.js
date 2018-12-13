const Hirer = require('../models/hirer');
const { validationResult } = require('express-validator/check');

//Renders Hirer Register Page
module.exports.getRegister = (req, res) => {
    res.render('hirer/register', {
        pageTitle: 'Hirer Register | Job Board'
    })
}

//Renders Hirer Login Page
module.exports.getLogin = (req, res) => {
    res.render('hirer/login', {
        pageTitle: 'Hirer Login | Job Board'
    });
}

// Handles Hirer Registration
module.exports.postRegister = (req, res, next) => {
    
    // Extracting Validation Errors from Express Validator
    const validationError = validationResult(req).array();

    // If Validation Error Exists Render the Sign Up page with Error Message and old User Input
    if(validationError.length > 0) {
        let errors = validationError.map(obj => obj.msg);
        return res.status(422).render('hirer/register', {
            pageTitle: 'hirer Register | Job Board',
            userInput: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
            },
            errors: errors
        });
    }


    // Count The number of hirer with same email as req.body.email
    Hirer.count({ where: { email: req.body.email } })
        .then(count => {

            // If one or more hirer is found with same email as req.body.email,
            // render the same page with error message and old User Input
            if(count > 0) {
                const errors = ['Email Already Exists'];
                return res.status(422).render('hirer/register', {
                    pageTitle: 'Hirer Register | Job Board',
                    userInput: {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: req.body.password,
                        confirmPassword: req.body.confirmPassword
                    },
                    errors: errors
                });
            } else {

                // If no hirer is found with the same email create new user
                const hirer = new Hirer({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password
                });

                // Save the new hirer into database
                hirer.save()
                    .then(() => {

                        // If hirer successfully created Redirect to Login Page with Success msg.
                        req.flash('success', ['Signed Up Successfuly'])
                        return res.redirect('/hirer/login');
                    })
                    .catch((error) => {

                        // If user cannot be created throw an error.
                        next(error);
                    });
            }
        })
        .catch((error) => {

            // If count users query cannot run, thorw an error.
            next(error);
        }); 
}