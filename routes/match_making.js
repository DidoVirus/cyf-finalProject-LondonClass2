var express = require('express');
var router = express.Router();
var app = express();
var dbs = require('../config/db.js');
var pool = dbs.getPool();
var moment = require('moment');
moment.locale('en-GB')


const weekStart = moment().add(1, 'w').startOf('week')
const weekEnd = moment().add(1, 'w').endOf('week')

const params = [
  weekStart.format(),
  weekEnd.format()
]

let student_availability = []
let mentor_availability = []
let booked_availability = []


router.post('/ss', async function (req, res) {
  // delete All data from the convenient_availability tabale
  try{
    const deleteAllDataFromCT = pool.query('DELETE FROM convenient_availability')
  }catch(error){
    console.log(error)
  }

  try {
    const fetchStudent = await pool.query(`SELECT slot_id, start_timestamp, note
                                            FROM users INNER JOIN slots USING(user_id)
                                            WHERE users.role_student = TRUE`)
    fetchStudent.rows.map(students => student_availability.push(students))
  } catch (error) {
    console.log(err)
  }

  try {
    const fetchMentors = await pool.query(`SELECT slot_id, start_timestamp
                                            FROM users INNER JOIN slots USING(user_id)
                                            WHERE users.role_mentor = TRUE`)
    fetchMentors.rows.map(mentor => mentor_availability.push(mentor))

  } catch (error) {
    console.log(err)
  }

  student_availability.forEach(student => {
    var student_matched = false;
    mentor_availability.forEach(mentor => {
      // console.log(mentor.start_timestamp)
      if (!student_matched) {
        let student_match = new Date(student.start_timestamp)
        let mentor_match = new Date(mentor.start_timestamp)
        if (student_match.getTime() === mentor_match.getTime()) {
          var shouldBook = true
          for (var i = 0; i < booked_availability.length; i++) {
            if (booked_availability[i].mentor === mentor.slot_id || booked_availability[i].student === student.slot_id) {
              shouldBook = false;
            }
          }
          if (shouldBook) {
            booked_availability.push({
              mentor: mentor.slot_id,
              student: student.slot_id,
              time: mentor.start_timestamp,
              note: student.note
            })
            student_matched = true
          }
        }
      }
    })
  })
  console.log("sec: ", booked_availability)
//
  for (var i = 0; i < booked_availability.length; i++) {
    let slots = [
      booked_availability[i].mentor,
      booked_availability[i].student,
      booked_availability[i].time,
      booked_availability[i].note
    ]

    console.log(booked_availability[i].time)
    let convenient = `INSERT INTO convenient_availability ( mentor_slot_id, student_slot_id, convenient_time, student_note)
                      VALUES ($1,$2,$3,$4);`
    pool.query(convenient, slots)
      .then(() => res.status(200))
      .catch((err) => {
        console.log(err);
        res.status(500).send({ status: false })
      })
  }


  res.send({ status: true })
})


 



module.exports = router
