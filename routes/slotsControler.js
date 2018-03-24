const router = require('express').Router();
const passport = require('passport');
var bodyParser = require('body-parser');
var dbs = require('../config/db.js');
var pool = dbs.getPool();



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
    }else{
        res.send('you have to choose between mentors or students')
    }

})

exports.deleteSlots= router.post('/api/delslots' , (req, res)=>{
    slotId = req.body.slot
    console.log(req.body)
    pool.connect( async (error , db ,  done) =>{
        if(error){
            return console.log(error)
        }
        const query = await db.query(`DELETE FROM Slots WHERE slot_id =${slotId}`,(err , data)=>{
            if(err){
                console.log('you get and error :' + err )
            }else{
                res.json(data)
                done()
            }
        })
    })


})

