
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