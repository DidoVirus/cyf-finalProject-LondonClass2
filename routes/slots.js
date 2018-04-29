
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var dbs = require('../config/db.js');
var pool = dbs.getPool();
var moment = require('moment');
moment.locale('en-GB')


// calculate the beginning and ending of the week
const weekStart = moment().add(1,'w').startOf('week')
const weekEnd = moment().add(1,'w').endOf('week')


// delet userslots from userslots page
router.delete('/slots', async function (req, res) {

  const sql = `DELETE FROM slots
                WHERE user_id = $1;`
  const data = [req.params.id]

  table = await pool.query(sql,data)
  .then(data => res.status(200).send({status: true}))
  .catch(err => {
    res.status(500).send({status:false})
    })

  })

router.get('/user', function getUser(req, res, next) {
  console.log(req.session, req.session.user);

  if(!req.session.user) {
    req.session.user = { test: 'test' };
    res.status(403);
    return res.send('Not logged in');
  }

  res.send(req.session.user);
});

router.get('/slots',function(req, res) {
  console.log("am req.session 2",req.session.passport.user);
  pool.connect((error,db,done)=>{
    if(error){
      return console.log(error);
    }else{
      db.query('SELECT * FROM slots INNER JOIN users ON (slots.user_id = users.user_id) AND users.user_id =$1',[req.session.passport.user],(error,user)=>{
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

// post the userslots to the slots table
router.post('/slots', async function(req, res) {

  console.log("am req.session",req.session.passport.user);

  req.body.user_availability.forEach(user_availability => {
    let data = [
      req.session.passport.user,
      user_availability.start_timestamp,
      req.body.note
      ]
      console.log("am all your",data);
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

module.exports = router
