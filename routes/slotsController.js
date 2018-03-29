const router = require('express').Router();
const passport = require('passport');
var bodyParser = require('body-parser');
var dbs = require('../config/db.js');
var pool = dbs.getPool();
const nodemailer = require('nodemailer')



exports.getAllSlots = router.get('/api/getslots', (req, res) => {
    pool.connect(async (error, db, done) => {
        if (error) {
            return console.log(error);
        }
        const querys = await db.query(`SELECT * FROM slots 
                                        INNER JOIN users ON
                                        (slots.user_id = users.user_id)`,
            (err, table) => {
                if (err) {
                    console.log(err)
                } else {
                    res.json(table.rows)
                    done()
                }

            })


    })
})

exports.getSlotsById = router.get('/slots/:id', (req, res) => {
    const userID = req.params.id
    pool.connect(async (error, db, done) => {
        if (error) {
            return console.log(error)
        }
        const query = await db.query(`SELECT * FROM slots 
                                        INNER JOIN users ON
                                        (slots.user_id = users.user_id) 
                                        AND (users.user_id=${userID})`,
            (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    res.json(data.rows)
                    done()
                }
            })
    })
})


exports.getSlotsBySlug = router.get('/:user', (req, res) => {

    const users = req.params.user
    if (users == 'students') {
        pool.connect(async (error, db, done) => {
            if (error) {
                return console.log(error)
            }
            const query = await db.query(`SELECT * FROM slots 
            INNER JOIN users ON
            (slots.user_id = users.user_id) 
            AND (users.role_student=true)`
                , (err, data) => {
                    if (err) {
                        console.log('you have an error' + err)
                    } else {
                        res.json(data.rows)
                    }

                }
            )
        })
    } else if (users == 'mentors') {
        pool.connect(async (error, db, done) => {
            if (error) {
                return console.log(error)
            }
            const query = await db.query(`SELECT * FROM slots 
            INNER JOIN users ON
            (slots.user_id = users.user_id) 
            AND (users.role_mentor=true)`
                , (err, data) => {
                    if (err) {
                        console.log('you have an error' + err)
                    } else {
                        res.json(data.rows)
                    }

                }
            )
        })
    } else {
        res.send('you have to choose between mentors or students')
    }

})

exports.deleteSlots = router.post('/api/delslots', (req, res) => {
    slotId = req.body.slot
    pool.connect(async (error, db, done) => {
        if (error) {
            return console.log(error)
        }
        const query = await db.query(`DELETE FROM Slots WHERE slot_id =${slotId}`, (err, data) => {
            if (err) {
                console.log('you get and error :' + err)
            } else {
                res.json(data)
                done()
            }
        })
    })


})
exports.getMatchSlots = router.get('/api/mach', (req, res) => {
    let studentSLots = []
    let mentorsSlots = []
    let matchSlots = []
    pool.connect(async (error, db, done) => {
        if (error) {
            return console.log(error)
        }
        const studentsQuery = await db.query(`SELECT * FROM slots 
        INNER JOIN users ON(slots.user_id = users.user_id)
         WHERE users.role_student=true` , (err, data) => {
                if (err) {
                    console.log('you have got an error' + err)
                } else {
                    data.rows.map(slots => studentSLots.push(slots))
                }
            })
        const mentorsQuery = await db.query(`SELECT * FROM slots 
         INNER JOIN users ON(slots.user_id = users.user_id)
          WHERE users.role_mentor=true` , (err, data) => {
                if (err) {
                    console.log('you have got an error' + err)
                } else {
                    data.rows.map(slots => mentorsSlots.push(slots))
                }
            })
        for (var i = 0; i < studentSLots.length; i++) {
            for (var j = 0; j < mentorsSlots.length; j++) {
                if (studentSLots[i].start_timestamp === mentorsSlots[j].start_timestamp) {
                    matchSlots.push(
                        studentSLots[i].user_id,
                        mentorsSlots[j].user_id,
                        studentSLots[i].start_timestamp)
                } else {
                    res.send('there is no match')
                }
            }
        }
        const matchQuery = await db.query(`SELECT * FROM slots 
        INNER JOIN users ON(slots.user_id = users.user_id)
         WHERE users.user_id = ${matchSlots[2]}`, (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    res.send(data)
                }
            })



    })

})

exports.sendEmail = router.post('/api/sendmail', (req, res) => {
    console.log(req.body)
    const bodyemail = `<p>you have a new meeting request from  <span font-size="2em"; >CodeYourFuture</span></p>
                        <h1> the subject of the meeting is : ${req.body.note} with ${req.body.studentEmail} at this time:${req.body.slotTime}</h1>
                        <p>please reply to this email to confirm the metting</p>`

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'amir.gevari@gmail.com',
            pass: '********'
        }
    });


    // setup email data with unicode symbols
    let mailOptions = {
        from: 'amir.gevari@gmail.com', // sender address
        to: `${req.body.mentorEmail},${req.body.studentEmail}`, // list of receivers
        subject: 'you have a new OnetoOne class from CodeYourFuture', // Subject line
        html: bodyemail// plain text body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.status(status).send(info)

    })

})

