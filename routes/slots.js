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

// get the slots to userslots page form slots table
router.get('/slots/:id', async function(req, res) {

  const params = [
    req.params.id,
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
      id:req.params.id,
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
  const data = [req.params.id]

  table = await pool.query(sql,data)
  .then(data => res.status(200).send({status: true}))
  .catch(err => {
    res.status(500).send({status:false})
    })

  })

// post the userslots to the slots table
router.post('/slots', async function(req, res) {
let newData = []
req.body.user_availability.forEach((start_timestamp) => {
  newData.push({
    start_timestamp: start_timestamp,
    note: req.body.note
  });
});
console.log(newData);
// console.log('this the id',req.body.id)
  req.body.user_availability.forEach(user_availability => {
    let data = [
      req.body.id,
      user_availability.start_timestamp,
      req.body.note
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

 // define the route organiser user_availability page route
 router.get('/organiser/:id/:user_id', async function(req, res) {
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
