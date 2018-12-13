
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

//Renders Register Page
module.exports.getLogin = (req, res) => {
  res.render('login', {
    pageTitle: 'Login | Job Board'
  });
}

//Renders Register Page
module.exports.getRegister = (req, res) => {
  res.render('register', {
    pageTitle: 'Register | Job Board'
  })
}



