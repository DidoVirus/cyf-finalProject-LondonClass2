var express = require('express');
var router = express.Router();
var app = express();
//var bodyParser = require('body-parser');
//require('dotenv').config()
var dbs = require('./db.js');
var pool = dbs.getPool();
var moment = require('moment');
moment.locale('en-GB')
//app.use(bodyParser.json({ type: 'application/json'}));



// define the home page route
router.get('/', function(req, res) {
 res.send('Homepage')
})

// define the slots page route
router.get('/slots', function(req, res) {
})

// define the userslots page route
router.get('/slots/:id', async function(req, res) {

  // calculate the beginning of the week
  const startDate = moment().startOf('week')  //moment().startOf('week')
  const endDate = moment().endOf('week')     //moment().add(startDate.day(),'day')

  const params = [
    req.params.id,
    startDate.format(),
    endDate.format()
  ];
  const sql = `SELECT *
               FROM slots
               WHERE user_id = $1
               AND start_timestamp BETWEEN $2 AND $3`
  const selectSlotsTimeNote = (row)=> ({start_timestamp: row.start_timestamp,
                            note:row.note})
  const getSlotsOfAvailability = (data)=> {
  const resutDataObject = {
        id:req.params.id,
        status:true,
        user_availability:data.rows.map(selectSlotsTimeNote)
      }
      return resutDataObject
  }

  table = await pool.query(sql, params)
          .then((data) => res.status(200).send(getSlotsOfAvailability(data)))
          .catch((err) => {
            console.log(err);
            res.status(500).send({status:false})
          })
})


router.delete('/slots/:id', async function (req, res) {
  const sql = `DELETE FROM slots
                WHERE user_id = $1;`
  const data = [
        req.params.id
                ]
  table = await pool.query(sql,data)
            .then((data) => res.status(200).send({status: true}))
            .catch((err) => {
              console.log(err);
              res.status(500).send({status:false})
            })
})


router.post('/slots/:id', async function(req, res) {
  const sql = `INSERT INTO slots (user_id, start_timestamp, note)
            VALUES ($1,$2,$3),
                   ($1,$4,$5),
                   ($1,$6,$7);`
  const data = [
    req.params.id,
    req.body.user_availability[0].start_timestamp,
    req.body.user_availability[0].note,
    req.body.user_availability[1].start_timestamp,
    req.body.user_availability[1].note,
    req.body.user_availability[2].start_timestamp,
    req.body.user_availability[2].note
  ]

  table = await pool.query(sql, data)
            .then((data) => res.status(200).send({status: true}))
            .catch((err) => {
              console.log(err);
              res.status(500).send({status:false})
            })
 })

 // define the organiser page route
 router.get('/organiser', function(req, res) {
   res.send('Admin Homepage');

 })

 // define the organiser user_availability page route
 router.get('/organiser/:id/:user_id', async function(req, res) {

   // calculate the beginning of the week
   const startDate = moment().startOf('week')  //moment().startOf('week')
   const endDate = moment().endOf('week')     //moment().add(startDate.day(),'day')

   const params = [
     req.params.user_id,
     startDate.format(),
     endDate.format()
   ];
   const sql = `SELECT *
                FROM slots
                WHERE user_id = $1
                AND start_timestamp BETWEEN $2 AND $3`
   const selectSlotsTimeNote = (row)=> ({
                              start_timestamp: row.start_timestamp,
                              note:row.note,
                              slot_id:row.slot_id})
   const getSlotsOfAvailability = (data)=> {
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
             console.log(err);
             res.status(500).send({status:false})
           })
 })






module.exports = router
