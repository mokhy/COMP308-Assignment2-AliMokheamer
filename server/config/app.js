// modules for node and express
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');

// modules for authentication
let session = require('express-session');
let passport = require('passport');

let passportJWT = require('passport-jwt');
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

// database setup area
let mongoose = require('mongoose');
let DB = require('./db');

/* a reference to the connection itself. Also I used useCreateIndex because
   there was a deprecation warning for collection.ensureIndex which was related to mongoose
   so I used a fix to get rid of the message, the link: https://github.com/Automattic/mongoose/issues/6890*/
mongoose.connect(DB.URI, { useNewUrlParser: true, useCreateIndex: true });

/* Opening the connection with a message to indicate we successfully connected,
   otherwise when an error event is triggered show what has happened
*/
let mongoDB = mongoose.connection;
mongoDB.on('error', console.log.bind(console, "Could not connect because of the following: "));
mongoDB.once('open', () => {
  console.log('Connected to MongoDB successfully...');
});

let indexRouter = require('../routes/index');
let contactsRouter = require('../routes/contacts');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* Removed because there will be no ejs pages, therefore there is no point to add functionality and design */
app.use(express.static(path.join(__dirname, '../../public')));
//app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use(cors());

app.use(session({
  secret: "ASecret",
  saveUninitialized: false,
  resave: false
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

/* User model defined */
let userModel = require('../models/user');
let User = userModel.User;

// define a User authentication strategy
passport.use(User.createStrategy());

// this part verifies that the token is being sent by the user and is valid
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = DB.secret;

let strategy = new JWTStrategy(jwtOptions, (jwt_payLoad, verified) => {
  User.findById(jwt_payLoad.id)
    .then(user => {
      return verified(null, user);
    })
    .catch(err => {
      return verified(err, false);
    });
});

passport.use(strategy);

app.use('/api', indexRouter);
app.use('/api/contacts', contactsRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
