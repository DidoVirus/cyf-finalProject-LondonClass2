var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var slots = require('../routes/slots');
var match_making = require('../routes/match_making');
var app = express();



//initialize the bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//initialize the passport

app.use(passport.initialize());
app.use(passport.session());



// initialize the routes
app.use('/api', slots);
app.use('/api', match_making);

// initialize the server
app.listen( process.env.PORT || 8080 );
console.info('listening on port 8080');
