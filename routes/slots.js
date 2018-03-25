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



router.get('/user', function getUser(req, res, next) {
  console.log(req.session, req.session.user);

  if(!req.session.user) {
    req.session.user = { test: 'test' };
    res.status(403);
    return res.send('Not logged in');
  }

  res.send(req.session.user);
});

// get the slots to userslots page form slots table
router.get('/slots', async function(req, res) {

  const params = [
    req.session.passport.user,
    weekStart.format(),
    weekEnd.format()
  ]
  const sql = `SELECT *
               FROM slots
               WHERE user_id = $1
               AND start_timestamp BETWEEN $2 AND $3`
  const selectSlotsTimeNote = row => ({
    start_timestamp: row.start_timestamp,
    note:row.note
    })
  const getSlotsOfAvailability = data=> {
    const resutDataObject = {
      id:req.session.passport.user,
      status:true,
      user_availability:data.rows.map(selectSlotsTimeNote)
      }
    return resutDataObject
    }

  table = await pool.query(sql, params)
  .then(data => res.status(200).send(getSlotsOfAvailability(data)))
  .catch(err => {
    res.status(500).send({status:false})
    })
  })

// delet userslots from userslots page
router.delete('/slots', async function (req, res) {

  const sql = `DELETE FROM slots
                WHERE user_id = $1;`
  const data = [req.session.passport.user]

  table = await pool.query(sql,data)
  .then(data => res.status(200).send({status: true}))
  .catch(err => {
    res.status(500).send({status:false})
    })

  })

  router.post('/slots/:id', async function(req, res) {

    req.body.user_availability.forEach(user_availability => {
      let data = [
        req.params.id,
        user_availability.start_timestamp,
        user_availability.note
        ]

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
// post the userslots to the slots table
// router.post('/slots', async function(req, res) {
//
//   console.log("req.session");
//   console.log(req.session);
//
//   req.body.user_availability.forEach(user_availability => {
//     let data = [
//       req.session.passport.user,
//       user_availability.start_timestamp,
//       req.body.note
//       ]
//       console.log(data);
//     let sql = `INSERT INTO slots (user_id, start_timestamp, note)
//               VALUES ($1,$2,$3);`
//     pool.query(sql, data)
//     .then(data => res.status(200))
//     .catch(err => {
//       res.status(500).send({status:false})
//       })
//     })
//     res.send({status:true})
//   })

 // define the route organiser user_availability page route
 router.get('/organiser', async function(req, res) {
   const params = [
      req.params.user_id,
      weekStart.format(),
      weekEnd.format()
    ]

   const sql = `SELECT *
                FROM slots
                WHERE user_id = $1
                AND start_timestamp BETWEEN $2 AND $3`

   const selectSlotsTimeNote = row => ({
     start_timestamp: row.start_timestamp,
     note:row.note,
     slot_id:row.slot_id
    })
   const getSlotsOfAvailability = data => {
   const resutDataObject = {
     id:req.params.user_id,
     status:true,
     user_availability:data.rows.map(selectSlotsTimeNote)
    }
     return resutDataObject
   }

   table = await pool.query(sql, params)
    .then((data) => res.status(200).send(getSlotsOfAvailability(data)))
    .catch((err) => {

      res.status(500).send({status:false})
    })
 })






module.exports = router
