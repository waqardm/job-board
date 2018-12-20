const Hirer = require('../models/hirer');
const Job = require('../models/job');
const { validationResult } = require('express-validator/check');
const companyName = "nubee.tech";

//Renders Hirer Register Page
module.exports.getRegister = (req, res) => {
    res.render('hirer/register', {
        pageTitle: 'Hirer Register | ' + companyName + ' - Helping newbies find great places to work 🎉'
    })
}

//Renders Hirer Login Page
module.exports.getLogin = (req, res) => {
    res.render('hirer/login', {
        pageTitle: 'Hirer Login | ' + companyName + ' - Helping newbies find great places to work 🎉'
    });
}

//Renders Add Job Page
module.exports.getAddJob = (req, res) => {
    res.render('hirer/addJob', {
        pageTitle: 'Add Job | ' + companyName + ' - Helping newbies find great places to work 🎉'
    });
}

//Renders Edit Job Page
module.exports.getEditJob = (req, res) => {
    res.render('hirer/editJob', {
        pageTitle: 'Edit Job | ' + companyName + ' - Helping newbies find great places to work 🎉'
    });
}


// Handles Hirer Registration
module.exports.postRegister = (req, res, next) => {

    const userInput = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        companyName: req.body.companyName,
        email: req.body.email,
        password: req.body.password,
    };
    
    // Extracting Validation Errors from Express Validator
    const validationError = validationResult(req).array();

    // If Validation Error Exists Render the Sign Up page with Error Message and old User Input
    if(validationError.length > 0) {
        let errors = validationError.map(obj => obj.msg);
        return res.status(422).render('hirer/register', {
            pageTitle: 'hirer Register | ' + companyName + ' - Helping newbies find great places to work 🎉',
            userInput: userInput,
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
                    pageTitle: 'Hirer Register | ' + companyName + ' - Helping newbies find great places to work 🎉',
                    userInput: userInput,
                    errors: errors
                });
            } else {

                // If no hirer is found with the same email create new user
                const hirer = new Hirer(userInput);

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

// Handels Hirer Login
module.exports.postLogin = (req, res, next) => {
    
    // Extracting Validation Errors from Express Validator
    const validationError = validationResult(req).array();

    // If Validation Error Exists, render the same page with error msg and old user input.
    if(validationError.length > 0) {
        let errors = validationError.map(obj => obj.msg);
        return res.status(422).render('hirer/login', {
            pageTitle: 'Hirer Login | ' + companyName + ' - Helping newbies find great places to work 🎉',
            userInput: {
                email: req.body.email,
                password: req.body.password,
            },
            errors: errors
        });
    }

    // Find Hirer With Given Email
    Hirer.findOne({ where : { email: req.body.email } })
        .then(hirer => {

            // Check If hirer Exists with the given Email
            if(hirer){

                // Check for the correct password
                hirer.checkPassword(req.body.password)
                    .then((isMatch) => {
                        if(isMatch) {
                            req.session.userType = 'hirer';
                            req.session.user = hirer;
                            req.session.save(error => {
                                if(error) {
                                    next(error);
                                }
                                else {
                                    return res.redirect('/');
                                }
                            });
                        } else {
                            let errors = ['Invalid Credentials'];
                            return res.status(422).render('hirer/login', {
                                pageTitle: 'Hirer Login | ' + companyName + ' - Helping newbies find great places to work 🎉',
                                userInput: {
                                    email: req.body.email,
                                    password: req.body.password,
                                },
                                errors: errors
                            });
                        }
                    })
                    .catch(error => {
                        next(error);
                    });
            } else {

                // If no hirer exists render the same page with error message
                let errors = ['Invalid Credentials'];
                return res.status(422).render('hirer/login', {
                    pageTitle: 'Hirer Login | ' + companyName + ' - Helping newbies find great places to work 🎉',
                    userInput: {
                        email: req.body.email,
                        password: req.body.password,
                    },
                    errors: errors
                });
            }
        })
        .catch(error => {
            next(error);
        });
}

// Handles Adding Job
module.exports.postAddJob = (req, res, next) => {

    const userInput = {
        positionAvailable: req.body.positionAvailable,
        salary: req.body.salary,
        location: req.body.location,
        aboutTheRole: req.body.aboutTheRole,
        candidateDetails: req.body.candidateDetails
    }

    // Extracting Validation Errors from Express Validator
    const validationError = validationResult(req).array();

    // If Validation Error Exists Render the Sign Up page with Error Message and old User Input
    if(validationError.length > 0) {
        let errors = validationError.map(obj => obj.msg);
        console.log(errors);
        return res.status(422).render('hirer/addJob', {
            pageTitle: 'Add Job | ' + companyName + ' - Helping newbies find great places to work 🎉',
            userInput: userInput,  
            errors: errors
        });
    }

    // Adding hirer Id to Job
    userInput.hirerId = req.user.id;

    // Creating Job
    const job = new Job(userInput);

    // Saving Job
    job.save()
        .then(() => {
            req.flash('success', ['Job Added Successfully']);
            res.redirect('/dashboard');
        })
        .catch(error => {
            next(error);
        });
}