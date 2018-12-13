const Candidate = require('../models/candidate');
const { validationResult } = require('express-validator/check');

//Renders Candidate Login Page
module.exports.getLogin = (req, res) => {
    res.render('candidate/login', {
        pageTitle: 'Candidate Login | Job Board'
    });
}


//Renders Candidate Register Page
module.exports.getRegister = (req, res) => {
    res.render('candidate/register', {
        pageTitle: 'Candidate Register | Job Board'
    })
}

// Handles Candidate Registration
module.exports.postRegister = (req, res, next) => {
    
    // Extracting Validation Errors from Express Validator
    const validationError = validationResult(req).array();

    // If Validation Error Exists Render the Sign Up page with Error Message and old User Input
    if(validationError.length > 0) {
        let errors = validationError.map(obj => obj.msg);
        return res.status(422).render('candidate/register', {
            pageTitle: 'Candidate Register | Job Board',
            userInput: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
            },
            errors: errors
        });
    }


    // Count The number of candidate with same email as req.body.email
    Candidate.count({ where: { email: req.body.email } })
        .then(count => {

            // If one or more candidate is found with same email as req.body.email,
            // render the same page with error message and old User Input
            if(count > 0) {
                const errors = ['Email Already Exists'];
                return res.status(422).render('candidate/register', {
                    pageTitle: 'Candidate Register | Job Board',
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

                // If no candidate is found with the same email create new user
                const candidate = new Candidate({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password
                });

                // Save the new candidate into database
                candidate.save()
                    .then(() => {

                        // If candidate successfully created Redirect to Login Page with Success msg.
                        req.flash('success', ['Signed Up Successfuly'])
                        return res.redirect('/candidate/login');
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