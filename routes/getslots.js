var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var dbs = require('../config/db.js');
var pool = dbs.getPool();
var moment = require('moment');
moment.locale('en-GB')



exports.slots= router.get('/api/slots',function(req, res) {
  console.log("am req.session 2",req.session.passport.user);
  pool.connect((error,db,done)=>{
    if(error){
      return console.log(error);
    }else{
      db.query('SELECT * FROM slots WHERE user_id=$1',[req.session.passport.user],(error,user)=>{
        done();
        if(error){
          return console.log(error);
        }else{
        res.json(user);
      }
    })
    }
  })
})
