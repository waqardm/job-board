
// Renders Index Page
module.exports.getIndex = (req, res) => {
<<<<<<< HEAD
    res.render('index');
}
=======
    res.render("index", {
      title: 'Get Your First Job in Tech | Job Board'
    });
}

// Renders About Page
module.exports.getAbout = (req, res) => {
  res.render("about", {
    title: "About Us | Job Board"
  });
};

//Renders Community Page

module.exports.getCommunity = (req, res) => {
  res.render('community', {
    title: "Community | Job Board"
  });
}

// Renders Contact Page
module.exports.getContact = (req, res) => {
  res.render("contact", {
    title: 'Contact Us | Job Board'
  });
}

//Renders Register Page
module.exports.getLogin = (req, res) => {
  res.render('login', {
    title: 'Login | Job Board'
  });
}

//Renders Register Page
module.exports.getRegister = (req, res) => {
  res.render('register', {
    title: 'Register | Job Board'
  })
}



>>>>>>> waqar
