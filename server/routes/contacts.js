let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
let passport = require('passport');

let contactModel = require('../models/contact');

/* Controller import in order to perform necessary logic */
let contactsController = require('../controllers/contact');

router.get('/', passport.authenticate('jwt', {session: false}), contactsController.displayContactPage);

/* GET Route for the Add Contact Page
   this will display the Add page */
   
router.get('/add', passport.authenticate('jwt', {session: false}), contactsController.displayAddPage);

/* POST Route for the Add page
   this processes the Add page to add a new contact */

router.post('/add', passport.authenticate('jwt', {session: false}), contactsController.processAddPage);

/* GET Route for the Edit page
   this displays the Edit page */

router.get('/edit/:id', passport.authenticate('jwt', {session: false}), contactsController.displayEditPage);

/* POST Route for the Edit page
   this processes the edit page to update a particular contact */

router.post('/edit/:id', passport.authenticate('jwt', {session: false}), contactsController.processEditPage);

/* GET Route for the deleting a contact
   this will delete a contact from the contact list */

router.get('/delete/:id', passport.authenticate('jwt', {session: false}), contactsController.deleteContact);

module.exports = router;
