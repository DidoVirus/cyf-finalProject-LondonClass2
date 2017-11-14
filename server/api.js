var express = require('express');
var path = require('path');
var db = ('../config/db.js');
var bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportSetup = require('../config/passport-setup');
var authRoutes = require('../routes/auth-routes');
var keys = require('../config/keys');
var ejs = require('ejs');

//using app as express
var app = express();

//setting view engine
app.set('view engine', 'ejs');

//setting up cooking session and giving it a day in milliseconds
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

//intialising passport and session
app.use(passport.initialize());
app.use(passport.session());

//bodyParser intialising
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//calling the home router
app.get('/', (req, res) => {
    res.render('home');
});

//using the auth for routes
app.use('/auth', authRoutes);

//setting up port
app.listen(process.env.PORT || 2500, function () {
  console.log("Server is listening on port 2500. Ready to accept requests!");
});
