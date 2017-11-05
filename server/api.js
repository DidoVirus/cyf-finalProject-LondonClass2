var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var passport = require('passport');
const passportSetup = require('../config/passport-setup');
var authRoutes = require('../routes/auth-routes');
var keys = require('../config/keys');
var ejs = require('ejs');
require('dotenv/config');

var app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
});

app.use('/auth', authRoutes);






console.log(process.env);

// var routes = require('./routes/index');
// var users = require('./routes/users');

//connect the database
var pool = new pg.Pool({
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  max: 20,
  host: process.env.DB_HOST,
  user:process.env.DB_USER
});
//quering the database
pool.connect((error, db, done)=>{
  if(error){
    return console.log(error);
  }
  else {
    db.query('SELECT * from rays',(error, table)=>{
      done();
      if(error){
        return console.log(error);
      }
      else {
        console.log(table);
      }
    })
  }
});

//initialize the bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//initialize the passport

app.use(passport.initialize());
app.use(passport.session());

app.listen(process.env.PORT || 2500, function () {
  console.log("Server is listening on port 2500. Ready to accept requests!");
});
