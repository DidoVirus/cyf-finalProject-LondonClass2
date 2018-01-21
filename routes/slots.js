var express = require('express');
var router = express.Router();
var app = express();
var dbs = require('./db.js');
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


// delete userslots from userslots page 
router.delete('/slots/:id', async function (req, res) {
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
s
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
