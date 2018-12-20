const Candidate = require('../models/candidate');
const Job = require('../models/job');
const { validationResult } = require('express-validator/check');

const companyName = 'nubee.tech';

//Renders Candidate Login Page
module.exports.getLogin = (req, res) => {
    res.render('candidate/login', {
        pageTitle: 'Candidate Login | ' + companyName + ' - Helping newbies find great places to work 🎉'
    });
}


//Renders Candidate Register Page
module.exports.getRegister = (req, res) => {
    res.render('candidate/register', {
        pageTitle: 'Candidate Register | ' + companyName + ' - Helping newbies find great places to work 🎉'
    });
}

// Handles Candidate Registration
module.exports.postRegister = (req, res, next) => {
    
    const userInput = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    };

    // Extracting Validation Errors from Express Validator
    const validationError = validationResult(req).array();

    // If Validation Error Exists Render the Sign Up page with Error Message and old User Input
    if(validationError.length > 0) {
        let errors = validationError.map(obj => obj.msg);
        return res.status(422).render('candidate/register', {
            pageTitle: 'Candidate Register ' + companyName + ' - Helping newbies find great places to work 🎉',
            userInput: userInput,
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
                    pageTitle: 'Candidate Register | ' + companyName + ' - Helping newbies find great places to work 🎉',
                    userInput: userInput,
                    errors: errors
                });
            } else {

                // If no candidate is found with the same email create new user
                const candidate = new Candidate(userInput);

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

// Handles Candidate Login
module.exports.postLogin = (req, res, next) => {
    
    // Extracting Validation Errors from Express Validator
    const validationError = validationResult(req).array();

    // If Validation Error Exists, render the same page with error msg and old user input.
    if(validationError.length > 0) {
        let errors = validationError.map(obj => obj.msg);
        return res.status(422).render('candidate/login', {
            pageTitle: 'Candidate Login | ' + companyName + ' - Helping newbies find great places to work 🎉',
            userInput: {
                email: req.body.email,
                password: req.body.password,
            },
            errors: errors
        });
    }

    // Find Candidate With Given Email
    Candidate.findOne({ where : { email: req.body.email } })
        .then(candidate => {

            // Check If candidate Exists with the given Email
            if(candidate){

                // Check for the correct password
                candidate.checkPassword(req.body.password)
                    .then((isMatch) => {
                        if(isMatch) {
                            req.session.userType = 'candidate';
                            req.session.user = candidate;
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
                            return res.status(422).render('candidate/login', {
                                pageTitle: 'Candidate Login | ' + companyName + ' - Helping newbies find great places to work 🎉',
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

                // If no candidate exists render the same page with error message
                let errors = ['Invalid Credentials'];
                return res.status(422).render('candidate/login', {
                    pageTitle: 'Candidate Login | ' + companyName + ' - Helping newbies find great places to work 🎉',
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


// Handles Post Edit Profile
module.exports.postEditProfile = (req, res, next) => {

    let isSaved = true;

    // Find Logged in candidate
    Candidate.findByPk(req.user.id)
        .then(candidate => {
            const newData = {
                email : req.body.email,
                github : req.body.github,
                stackOverflow : req.body.stackOverflow,
                dribbble : req.body.dribbble,
                twitter : req.body.twitter,
                shortIntro : req.body.shortIntro,
                longIntro : req.body.longIntro
            }

            if(req.body.password || req.body.confirmPassword) {
                if(req.body.password === req.body.confirmPassword && req.body.password.length >= 5) {
                    newData.password = req.body.password;
                } else {
                    isSaved = false;
                    req.flash('errors', ['Password do not match']);
                    return res.redirect('/profile/edit');
                }
            }

            return candidate.update(newData);
        })
        .then(() => {
            if(isSaved) {
                req.flash('success', ['Profile Edited Successfully']);
                res.redirect('/profile');
            }
        })
        .catch(error => {
            next(error);
        });
}


// Renders Jobs Page
module.exports.getJobs = (req, res, next) => {

    // Get all Jobs
    Job.findAll()
        .then(jobs => {
            res.render('candidate/jobs', {
                pageTitle: 'Jobs',
                jobs: jobs
            });
        })
        .catch(error => {
            next(error);
        });
}