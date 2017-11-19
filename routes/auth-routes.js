const router = require('express').Router();
const passport = require('passport');
var bodyParser = require('body-parser');
var dbs = require('../config/db.js');
var pool = dbs.getPool();

// auth login to return the logining page
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout to return the logout page
router.get('/logout', (req, res) => {
  req.logout();
res.redirect('/');
});

// auth github to call github to authoticate
router.get('/github', passport.authenticate('github', {
     scope:['profile']
}));

//auth verif to return the verification page
router.get('/verif', function(req, res, next) {
  res.render('verif',{ user: req.user })
});

router.get('/verifAgain', function(req, res, next) {
  res.render('verifAgain',{ user: req.user })
});

// //rendering the dashboard
// router.get('/dashBoard', function(req, res, next) {
//   res.render('dashBoard')
// });

//auth verif to capture what the user verification code
router.post('/verif', function(req, res) {
  var verifCode =req.body.id;// storing the user verification code in variable
console.log('this the number',verifCode)
  //connecting to database to check verification_codes table with user input
  pool.connect((error, db, done)=>{
    if(error){
      return console.log(error);
    }
    else {
      db.query('SELECT * FROM verification_codes WHERE code = $1',[verifCode],(error, user)=>{
        done();
        if(error){
          return console.log(error);
        }
    //updating the user table with user verification code
        else {
          if (!user.rowCount){
            res.redirect('/auth/verifAgain');
          }
          else{
              console.log(user.rows[0])
                var studentValue = user.rows[0].role_student;
                var mentorValue = user.rows[0].role_mentor;
                var organiserValue = user.rows[0].role_organiser;

          db.query(`UPDATE users
            SET role_student=$1, role_mentor=$2, role_organiser=$3
            WHERE user_id=$4;`,
            [studentValue,mentorValue,organiserValue,req.user.user_id])
            done();
            if(error){
              return console.log('am the ',error);
            }
            else{
              res.redirect('/dashBoard/');
            }
        };
    };

});
};
});
});

//handling the call back redirect from github
router.get('/github/redirect', passport.authenticate('github',{ failureRedirect: '/login',successRedirect:'http://localhost:3000/activation' }), (req, res) => {
    res.send(req.user);
});

module.exports = router;
