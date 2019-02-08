let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome!'});
});

/* GET about me page. */
router.get('/about', function(req, res, next) {
  res.render('aboutMe', { title: 'About Me' });
});

/* GET projects page. */
router.get('/projects', function(req, res, next) {
  res.render('index', { title: 'My Projects' });
});

/* GET services page. */
router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Services' });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact Me' });
});

/* Not part of Navbar routes */

/* GET resume page. */
router.get('/my-resume', function(req, res, next) {
  res.render('aliResume', { title: 'Resume' });
});

module.exports = router;