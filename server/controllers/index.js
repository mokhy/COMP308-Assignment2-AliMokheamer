let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

// module.exports.displayHomePage = function (req, res, next) {
//     res.render('content', { title: 'Home' });
//   }

// module.exports.displayAboutPage = (req, res, next) => {
//     res.render('content', { title: 'About Me' });
//   }

// module.exports.displayProjectsPage = (req, res, next) => {
//     res.render('content', { title: 'My Projects' });
//   }

// module.exports.displayServicesPage = (req, res, next) => {
//     res.render('content', { title: 'Services' });
//   }

// module.exports.displayContactPage = (req, res, next) => {
//     res.render('content', { title: 'Contact Me' });
//   }

//   module.exports.displayResumePage = (req, res, next) => {
//     res.render('aliResume', { title: 'Resume' });
//   }

  module.exports.processLoginPage = (req, res, next) => {
    
  }

  module.exports.processRegistrationPage = (req, res, next) => {
    
  }

  module.exports.performLogout = (req, res, next) => {
    res.logout();
    res.json({success: true, msg: 'Successfully logged out user'});
  }