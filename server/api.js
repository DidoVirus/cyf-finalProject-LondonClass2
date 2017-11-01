var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var passport = require('passport');

require('dotenv/config');
console.log(process.env);
var app = express();
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
    db.query('SELECT * from USERS',(error, table)=>{
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
