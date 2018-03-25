var express = require('express');
var router = express.Router();
var app = express();
var dbs = require('../config/db.js');
var pool = dbs.getPool();
var moment = require('moment');
moment.locale('en-GB')

const weekStart = moment().add(1,'w').startOf('week')
const weekEnd = moment().add(1,'w').endOf('week')

const params = [
  weekStart.format(),
  weekEnd.format()
  ]

let student_availability = []
let mentor_availability =[]
let booked_availability = []


router.post('/ss', async function(req, res){
  const sqlStudent = `SELECT slot_id, start_timestamp, note
              FROM users INNER JOIN slots USING(user_id)
              WHERE users.role_student = TRUE
              AND start_timestamp BETWEEN $1 AND $2`

  pool.query(sqlStudent, params)
  .then(data => {
    console.log(data);
    for(let i=0; i < data.rows.length; i++) {
      student_availability.push(data.rows[i])
    }
    console.log(data.rows);
    })
  .catch(err => {
    console.log(err);
    res.status(500).send({status:false})
  })
  const sqlMentor = `SELECT slot_id, start_timestamp
              FROM users INNER JOIN slots USING(user_id)
              WHERE users.role_mentor = TRUE
              AND start_timestamp BETWEEN $1 AND $2`

  pool.query(sqlMentor, params)
  .then(data => {
    for(let i=0; i < data.rows.length; i++) {
      mentor_availability.push(data.rows[i])
    }
  student_availability.forEach(student => {
    console.log("Looping student with slot ID " + student.slot_id)
    var student_matched = false;
    mentor_availability.forEach(mentor => {
       if(!student_matched) {
         let student_match = new Date(student.start_timestamp)
         let mentor_match = new Date(mentor.start_timestamp)
         console.log("Looping mentor with slot ID " + mentor.slot_id)
         if(student_match.getTime() == mentor_match.getTime()) {
          var shouldBook = true
            // need to update the check after confirm the data type in booked_availability []
            // const check_booked_availability = booked_availability.indexOf(mentor.slot_id)
            console.log("Matched time - student: " + student_match.getTime() + " mentor: " + mentor_match.getTime());
            console.log("Looping booked slots");
          for (var i=0; i<booked_availability.length; i++) {
            console.log(booked_availability[i].mentor)
            console.log(mentor.slot_id)
            console.log("Checking availability - already booked: " + booked_availability[i].mentor + " current: " + mentor.slot_id)

            if(booked_availability[i].mentor === mentor.slot_id) {
                console.log("Matched - already booked " + booked_availability[i].mentor + " current " + mentor.slot_id)
              shouldBook = false;
              }
            }
            if(shouldBook) {
              booked_availability.push({
                mentor: mentor.slot_id,
                student: student.slot_id,
                time: mentor.start_timestamp,
                note: student.note
                })
              //need to add function make the push for the first result and ignore the rest
              //need to review the pushing data for suggest the best way to format
              console.log("booking meeting - mentor:" + mentor.slot_id + " - student: " + student.slot_id + "student note: " + student.note)
              student_matched = true
            }
          }
        }
      })
    })


  for (var i=0; i<booked_availability.length; i++){
    let slots = [
        booked_availability[i].mentor,
        booked_availability[i].student,
        booked_availability[i].time,
        booked_availability[i].note
      ]

    console.log("slots to post: " + slots)
    let convenient = `INSERT INTO convenient_availability ( mentor_slot_id, student_slot_id, convenient_time, student_note)
                      VALUES ($1,$2,$3,$4);`
    pool.query(convenient, slots)
    .then(() => res.status(200))
    .catch((err) => {
      console.log(err);
      res.status(500).send({status:false})
      })
    }
  })

  res.send({status:true})

})







module.exports = router
