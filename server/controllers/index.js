let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

let jwt = require('jsonwebtoken');
let DB = require('../config/db');

/* Defining the User model so creating a user will be possible 
   when the user signs up*/
   let userModel = require('../models/user');
   let User = userModel.User;

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
    passport.authenticate('local', (err, user, info) => {
      // if there is a server error, return that error
      if (err) {
        return next(err);
      }

      /* if there is a login error, display a message to notify
         the user */
      if (!user) {
        return res.json({success: false, msg: 'Error: Failed to login user'});
      }
      req.logIn(user, (err) => {
        // if a server error occurs, return the error
        if (err) {
          return next(err);
        }

        const payLoad = {
          id: user._id,
          username: user.username,
          email: user.email,
          displayName: user.displayName
        }

        const authenticationToken = jwt.sign(payLoad, DB.secret, {
          expiresIn: 172800 // 2 days
        });

        return res.json({success: true, msg: 'Successfully logged in user', user: {
          id: user._id,
          username: user.username,
          email: user.email,
          displayName: user.displayName
        }, token: authenticationToken});

      });
    })(req, res, next);
  }

  module.exports.processRegistrationPage = (req, res, next) => {
    
    // creating a new user by creating a user object
    let newUser = new User({
      username: req.body.username,
      /* no password because we don't want to store it as
      / clear text */
      email: req.body.email,
      displayName: req.body.displayName
    });

    // console.log(newUser);

    User.register(newUser, req.body.password, (err) => {
      if (err) {
        console.log('Error: User cannot be created');
        // console.log(err.name);
        if (err.name == "UserExistsError") {
          console.log('Error: User exists');
        }
        return res.json({success: false, msg: 'Error: Failed to register user'});
      } else {
        /* if the user does not exists and there is no other error, create
           the user and give a message that the process is successful, then 
           redirect (handled by Angular) */
        return res.json({success: true, msg: 'Successfully created User'});
      }
    });
  }

  module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.json({success: true, msg: 'Successfully logged out user'});
  }
