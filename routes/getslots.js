var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var dbs = require('../config/db.js');
var pool = dbs.getPool();
var moment = require('moment');
moment.locale('en-GB')



exports.slots= router.get('/api/slots',function(req, res) {;
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
exports.postSlots=router.post('/api/slots', async function(req, res) {
  console.log("am req.session",req.session.passport.user);
  req.body.user_availability.forEach(user_availability => {
    let data = [
      req.session.passport.user,
      user_availability.start_timestamp,
      req.body.note
      ]
      console.log(data);
    let sql = `INSERT INTO slots (user_id, start_timestamp, note)
              VALUES ($1,$2,$3);`
    pool.query(sql, data)
    .then(data => res.status(200))
    .catch(err => {
      res.status(500).send({status:false})
      })
    })
    res.send({status:true})
  })
