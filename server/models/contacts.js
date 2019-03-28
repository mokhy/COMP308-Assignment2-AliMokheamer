let mongoose = require('mongoose');

let contactSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String
},
{
    collection: "contacts"
});

module.exports = mongoose.model('contacts', contactSchema);