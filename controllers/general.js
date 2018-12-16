
// Renders Index Page
module.exports.getIndex = (req, res) => {
  res.render("index", {
    pageTitle: 'Get Your First Job in Tech | Job Board'
  });
}

// Renders About Page
module.exports.getAbout = (req, res) => {
  res.render("about", {
    pageTitle: "About Us | Job Board"
  });
};

//Renders Community Page
module.exports.getCommunity = (req, res) => {
  res.render('community', {
    pageTitle: "Community | Job Board"
  });
}

// Renders Contact Page
module.exports.getContact = (req, res) => {
  res.render("contact", {
    pageTitle: 'Contact Us | Job Board'
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
      pageTitle: 'Hirer Dashboard | Job Board'
    });
  } else if(req.session.userType === 'candidate') {
    res.render('candidate/dashboard', {
      pageTitle: 'Candidate Dashboard | Job Board'
    });
  } else {
    next(new Error('Unauthorized'));
  }
}

// Renders User Profile
module.exports.getProfile = (req, res,next) => {
  if(req.session.userType === 'hirer') {
    res.render('hirer/profile', {
      pageTitle: 'Hirer Profile | Job Board'
    });
  } else if(req.session.userType === 'candidate') {
    res.render('candidate/profile', {
      pageTitle: 'Candidate Profile | Job Board'
    });
  } else {
    next(new Error('Unauthorized'));
  }
}

//Renders Edit Profile
module.exports.getEditProfile = (req, res) => {
  if(req.session.userType === 'hirer') {
    res.render('hirer/editProfile', {
      pageTitle: 'Edit Profile | Job Board'
    });
  } else if(req.session.userType === 'candidate'){
    res.render('candidate/editProfile', {
      pageTitle: 'Edit Profile | Job Board'
    });
  } else {
    next(new Error('Unauthorized'));
  }
}