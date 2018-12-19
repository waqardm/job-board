const Hirer = require('../models/hirer');
const Candidate = require('../models/candidate');
const companyName = "Nubee.Tech";

// Renders Index Page
module.exports.getIndex = (req, res) => {
  res.render("index", {
    pageTitle: 'Get Your First Job in Tech | ' + companyName + ' - Helping newbies find great places to work 🎉'
  });
}

// Renders About Page
module.exports.getAbout = (req, res) => {
  res.render("about", {
    pageTitle: 'About Us | ' + companyName + ' - Helping newbies find great places to work 🎉'
  });
};

//Renders Community Page
module.exports.getCommunity = (req, res) => {
  res.render('community', {
    pageTitle: 'Community | ' + companyName + ' - Helping newbies find great places to work 🎉'
  });
}

// Renders Contact Page
module.exports.getContact = (req, res) => {
  res.render("contact", {
    pageTitle: 'Contact Us | ' + companyName + ' - Helping newbies find great places to work 🎉'
  });
}

// Handel User Logout
module.exports.postLogout = (req, res, next) => {
  req.session.destroy(error => {
    if(error) {
      next(error);
    }
    else {
      res.redirect('/');
    }
  });
}

// Renders Dashboard
module.exports.getDashboard = (req, res, next) => {
  if(req.session.userType === 'hirer') {
    res.render('hirer/dashboard', {
      pageTitle: 'Hirer Dashboard | ' + companyName + ' - Helping newbies find great places to work 🎉'
    });
  } else if(req.session.userType === 'candidate') {
    res.render('candidate/dashboard', {
      pageTitle: 'Candidate Dashboard | ' + companyName + ' - Helping newbies find great places to work 🎉'
    });
  } else {
    next(new Error('Unauthorized'));
  }
}

// Renders User Profile
module.exports.getProfile = (req, res,next) => {
  if(req.session.userType === 'hirer') {
    res.render('hirer/profile', {
      pageTitle: 'Hirer Profile | ' + companyName + ' - Helping newbies find great places to work 🎉'
    });
  } else if(req.session.userType === 'candidate') {
    res.render('candidate/profile', {
      pageTitle: 'Candidate Profile | ' + companyName + ' - Helping newbies find great places to work 🎉'
    });
  } else {
    next(new Error('Unauthorized'));
  }
}

//Renders Edit Profile
module.exports.getEditProfile = (req, res) => {
  let User;

  if(req.session.userType === 'hirer') {
    User = Hirer;
  } else if(req.session.userType === 'candidate'){
    User = Candidate;
  } else {
    next(new Error('Unauthorized'));
  }

  User.findByPk(req.user.id)
    .then(user => {
      res.render(req.session.userType + '/editProfile', {
        pageTitle: 'Edit Profile | ' + companyName + ' - Helping newbies find great places to work 🎉',
        userInput : user
      });
    })
    .catch(error => {
      next(error);
    });
}