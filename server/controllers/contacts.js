let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

let contactModel = require('../models/contacts');


module.exports.displayContactPage = (req, res, next) => {
    contactModel.find((err, contactList) => {
        if (err) {
            return console.log(err);
        } else {
            res.json({success: true, msg: 'Contact list page displayed successfully', contactList: contactList});
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.json({success: true, msg: 'Add page successfully loaded and displayed'});
}

module.exports.processAddPage = (req, res, next) => {
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
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    contactModel.findById(id, (err, contactObject) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.json({success: true, msg: 'Contact to edit displayed successfully', contact: contactObject});
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
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
            res.json({success: true, msg: 'Successfully updated the contact', contact: updateAContact});
        }
    });
}

module.exports.deleteContact = (req, res, next) => {
    let id = req.params.id;

    contactModel.remove({_id: id}, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.json({success: true, msg: 'Successfully deleted the contact'});
        }
    });
}
