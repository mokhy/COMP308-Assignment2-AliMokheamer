let express = require('express');
let router = express.Router();
//let jwt = require('jsonwebtoken');

let contactModel = require('../models/contacts');

router.get('/', (req, res, next) => {
    contactModel.find((err, contactList) => {
        if (err) {
            return console.log(err);
        } else {
            res.render('contactList/index', {
                title: 'Contact List',
                contactList: contactList
            });
            // res.json({success: true, msg: 'Add page successfully loaded and displayed', contactList: contactList});
        }
    });
});

/* GET Route for the Add Contact Page
   this will retrieve the Add page */
   
router.get('/add', (req, res, next) => {
    res.json({success: true, msg: 'Add page successfully loaded and displayed'});
});

/* POST Route for the Add page
   this processes the Add page */

router.post('/add', (req, res, next) => {
    let newContact = contactModel({
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "phoneNumber": req.body.phoneNumber
    });

    contactModel.create(newContact, (err, contactModel) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.json({success: true, msg: 'Created a contact successfully'});
        }
    });
});

/* GET Route for the Edit page
   this displays the Edit page */

router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    contactModel.findById(id, (err, contactObject) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.json({success: true, msg: 'Contact to edit displayed successfully', contact: contactObject});
        }
    });
});

router.post('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    let updateAContact = contactModel({
        "_id": id,
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "phoneNumber": req.body.phoneNumber
    });

    contactModel.update({_id: id}, updateAContact, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.json({success: true, msg: 'Successfully updated the contact'});
        }
    });
});

/* GET Route for the deleting a contact
   this will delete a contact from the contact list */

    router.get('/delete/:id', (req, res, next) => {
        let id = req.params.id;

        contactModel.remove({_id: id}, (err) => {
            if (err) {
                console.log(err);
                res.end(err);
            } else {
                res.json({success: true, msg: 'Successfully deleted the contact'});
            }
        });
    });

module.exports = router;
