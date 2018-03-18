var express = require('express');
var path = require('path');
var db = ('../config/db.js');
var bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportSetup = require('../config/passport-setup');
var authRoutes = require('../routes/auth-routes');
var slots = require('../routes/slots');
var dashBoardRoutes = require('../routes/dashBoard-routes');
var keys = require('../config/keys');
var ejs = require('ejs');
var cors = require('cors')
var slots = require('../routes/slots');
var match_making = require('../routes/match_making');
var session = require('express-session');

//using app as express
var app = express();

//setting view engine
app.set('view engine', 'ejs');

//setting up cooking session and giving it a day in milliseconds
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(session({
  secret: 'convenientapp',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

//intialising passport and session
app.use(passport.initialize());
app.use(passport.session());

//bodyParser intialising
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//calling the home router
app.get('/', (req, res) => {
    res.render('home',{ user: req.user });
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
});
app.use('/api', slots);
app.use('/api', match_making);

//using the auth for routes
app.use('/auth', authRoutes);
//app.use('/dashBoard', dashBoardRoutes);
//app.use('/slots', slots);



//setting up port
app.listen(process.env.PORT || 2500, function () {
  console.log("Server is listening on port 2500. Ready to accept requests!");
});
