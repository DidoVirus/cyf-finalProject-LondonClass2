var express = require('express');
var router = express.Router();
var app = express();
var dbs = require('./db.js');
var pool = dbs.getPool();
var moment = require('moment');
moment.locale('en-GB')

const startDate = moment().startOf('week')  //moment().startOf('week')
const endDate = moment().endOf('week')     //moment().add(startDate.day(),'day')

const params = [
  startDate.format(),
  endDate.format()
];



let student_availability = [];
let mentor_availability =[];
let booked_availability = [];



router.get('/ss', async function(req, res) {

  const sqlStudent = `SELECT slot_id, start_timestamp
              FROM users INNER JOIN slots USING(user_id)
              WHERE users.role_student = TRUE
              AND start_timestamp BETWEEN $1 AND $2`

  pool.query(sqlStudent, params)

  .then((data) => {
  for(let i=0; i < data.rows.length; i++) {
    student_availability.push(data.rows[i])
    }

  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({status:false})
  })
  const sqlMentor = `SELECT slot_id, start_timestamp
              FROM users INNER JOIN slots USING(user_id)
              WHERE users.role_mentor = TRUE
              AND start_timestamp BETWEEN $1 AND $2`

  pool.query(sqlMentor, params)

  .then((data) => {
  for(let i=0; i < data.rows.length; i++) {
    mentor_availability.push(data.rows[i])
    }

    student_availability.forEach(function(student) {
      mentor_availability.forEach(function(mentor) {
        var student_match = new Date(student.start_timestamp);
        var mentor_match = new Date(mentor.start_timestamp);
        if(student_match.getTime() == mentor_match.getTime()){
          // need to update the check after confirm the data type in booked_availability []
          const check_booked_availability = booked_availability.indexOf(mentor.slot_id)
          if (check_booked_availability == -1){
            //need to add function make the push for the first result and ignore the rest
            //need to review the pushing data for suggest the best way to format
            booked_availability.push({mentor:mentor.slot_id,
                                      student:student.slot_id
                                      })
          }else {
            // continue search for another availability
          }

        }else {
          // continue search for another availability
        }
      })
  })

    res.status(200).send(data.rows)
  })

  .catch((err) => {
    console.log(err);
    res.status(500).send({status:false})

  })


})







module.exports = router
