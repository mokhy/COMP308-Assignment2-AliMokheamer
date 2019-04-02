let mongoose = require('mongoose');
let passportLocalMongoose = require("passport-local-mongoose");

let userSchema = mongoose.Schema({
    userName: {
        type: String,
        default: '',
        trim: true,
        required: 'Username required'
    },
    /* Not going to be needed because JWT will automatically encrypt the password */
    /* password: {
        type: String,
        default: '',
        trim: true,
        required: 'Password required'
    }, */
    email: {
        type: String,
        default: '',
        trim: true,
        required: 'Email address required'
    },
    displayName: {
        type: String,
        default: '',
        trim: true,
        required: 'Display Name required'
    },
    created: {
        type: Date,
        default: Date.now
      },
      update: {
        type: Date,
        default: Date.now
      }
    },
    {
      collection: "users"
    }
);

let options = ({
  missingPasswordError: "Wrong / Missing Password"
});

userSchema.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', userSchema);
