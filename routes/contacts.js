let express = require('express');
let router = express.Router();

let contactModel = require('../models/contacts');

router.get('/', (req, res, next) => {
    contactModel.find((err, contactList) => {
        if (err) {
            return console.log(err);
        } else {
            console.log(contactList);
        }
    });
});

/* GET Route for the Add Contact Page
   this will retrieve the Add page */
   
router.get('/add')

module.exports = router;