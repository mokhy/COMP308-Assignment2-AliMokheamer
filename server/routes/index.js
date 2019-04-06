let express = require('express');
let router = express.Router();

/* Registration and Login routing will be handled here (back-end) */

let indexController = require('../controllers/index');

// /* GET home page. */
// router.get('/', indexController.displayHomePage);

// /* GET about me page. */
// router.get('/about', indexController.displayAboutPage);

// /* GET projects page. */
// router.get('/projects', indexController.displayProjectsPage);

// /* GET services page. */
// router.get('/services', indexController.displayServicesPage);

// /* GET contact page. */
// router.get('/contact', indexController.displayContactPage);

// |--/* Not part of Navbar routes */-------------------------------|
// |                                                                |
// |  /* GET resume page. */                                        |
// |  router.get('/my-resume', indexController.displayResumePage);  |
// |----------------------------------------------------------------|

/* POST Route for Login page 
   this processes the Login page to login the user */
   router.post('/signin', indexController.processLoginPage);

/* POST Route for Registration page
   this processes the Registration page to register a user */
   router.post('/signup', indexController.processRegistrationPage)

/* GET Route for Logout
   this will logout the user when the "logout" link is clicked */
   router.get('/signout', indexController.performLogout);

module.exports = router;
