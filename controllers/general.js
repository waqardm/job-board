
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

//Renders Candidate Login Page
module.exports.getCandidateLogin = (req, res) => {
  res.render('candidate/login', {
    pageTitle: 'Candidate Login | Job Board'
  });
}

//Renders Hirer Login Page
module.exports.getHirerLogin = (req, res) => {
  res.render('hirer/login', {
    pageTitle: 'Hirer Login | Job Board'
  });
}

//Renders Candidate Register Page
module.exports.getCandidateRegister = (req, res) => {
  res.render('candidate/register', {
    pageTitle: 'Candidate Register | Job Board'
  })
}

//Renders Hirer Register Page
module.exports.getHirerRegister = (req, res) => {
  res.render('hirer/register', {
    pageTitle: 'Hirer Register | Job Board'
  })
}






