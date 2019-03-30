let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

let contactModel = require('../models/contacts');

/* Controller import in order to perform necessary logic */
let contactsController = require('../controllers/contacts');

router.get('/', contactsController.displayContactPage);

/* GET Route for the Add Contact Page
   this will display the Add page */
   
router.get('/add', contactsController.displayAddPage);

/* POST Route for the Add page
   this processes the Add page to add a new contact */

router.post('/add', contactsController.processAddPage);

/* GET Route for the Edit page
   this displays the Edit page */

router.get('/edit/:id', contactsController.displayEditPage);

/* POST Route for the Edit page
   this processes the edit page to update a particular contact */

router.post('/edit/:id', contactsController.processEditPage);

/* GET Route for the deleting a contact
   this will delete a contact from the contact list */

router.get('/delete/:id', contactsController.deleteContact);

module.exports = router;
