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
                    var user = req.user
                    res.json([table.rows, user])
                    done()
                }

            })


    })

})

exports.getSlotsById = (req, res) => {
    const slotId = req.params.id
    pool.connect(async (error, db, done) => {
        if (error) {
            return console.log(error)
        }
        const query = await db.query(`SELECT * FROM slots
                                        INNER JOIN users ON

                                        (slots.user_id = users.user_id) 
                                        WHERE slot_id=ANY(ARRAY[${slotId}])`,
            (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    res.json(data.rows)
                    done()
                }
            })
    })
}


exports.getSlotsBySlug = (req, res) => {

    const users = req.params.user

    console.log(users)
    pool.connect(async (error, db, done) => {
        if (error) {
            return console.log(error)
        }
        try{
            const queryUsers = await db.query(`SELECT * from users
            WHERE user_id=ANY(ARRAY[${users}])`)
            res.json(queryUsers.rows)

        }catch(error){
            console.log(error)
        }

    })


}

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
exports.getMatchSlots = (req, res) => {

    pool.connect(async (err, db, done) => {
        if (err) {
            console.log('you have an error: ' + err)
        }
        try {
            const queryMatchSlots = await db.query(`SELECT * FROM convenient_availability`)
            res.json(queryMatchSlots.rows)


        } catch (error) {
            console.log(error)
        }

       
    })

}

exports.sendEmail = router.post('/api/sendmail', (req, res) => {
    console.log(req.body)
    const bodyemail = `<p>you have a new meeting request from  <span font-size="2em"; >CodeYourFuture</span></p>
                        <h1> the subject of the meeting is : ${req.body.note} with ${req.body.studentEmail} at this time:${req.body.slotTime}</h1>
                        <p>please reply to this email to confirm the metting</p>`

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'amir.gevari@gmail.com',
            pass: 'Behnaz_88490'
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
exports.logOut = router.get('/api/logout', (req, res, next) => {
    console.log('first', req.user)
    if (req.isAuthenticated()) {
        req.session.destroy;
        req.user = null
        res.redirect('/')
        console.log('you loged out', req.user)
    } if (req.isUnauthenticated()) {
        console.log('you have to log in')
    }

    // res.json({status : 'you sucssefuly loged out'})




})

exports.postSlots = async function(req, res) {

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
    }

