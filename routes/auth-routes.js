const router = require('express').Router();
const passport = require('passport');
var bodyParser = require('body-parser');
var dbs = require('../config/db.js');
var pool = dbs.getPool();
const url = require('url');

// auth login to return the logining page
router.get('/login', (req, res) => {
  req.session.user = req.user;
    res.render('login', { user: req.user });
});

// auth logout to return the logout page
router.get('/logout', (req, res) => {
  req.logout();
res.redirect('/');
});

router.get('/meeting', (req, res) => {
res.redirect('http://localhost:3000/meeting');
});

router.get('/user-details', (req, res) => {
  console.log("USER DETAILS");
  console.log(req.user);
  res.status(200).send({ user: req.user });
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

//auth verif to capture what the user verification code
router.post('/verif', function(req, res) {
  var verifCode =req.body.id;
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
              //console.log(user.rows[0])
              //console.log('yesyes',req.user.user_id);
                var user_id = req.user.user_id;
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
                  res.redirect('http://localhost:3000/dashboard');

};
};
});
};
});
});

//handling the call back redirect from github

router.get('/github/redirect', passport.authenticate('github',{ failureRedirect: '/login'}),
function(req, res) {
var user_id1 = req.user.github_id;
 //console.log("am userrrrr",req.user.github_id);
  pool.connect((error, db, done)=>{
    if(error){
      return console.log(error);
    }
     else {
      db.query('SELECT * FROM users WHERE github_id= $1',[user_id1],(error, user)=>{
        // console.log('user.rowCount info ',user)
        done();
        if(error){
          return console.log(error);
        }
    //updating the user table with user verification cod
        else if (user.rows[0].role_student===null || user.rows[0].role_mentor===null || user.rows[0].role_organiser===null){
            res.redirect('http://localhost:3000/Activation');

          }
           else{
    res.redirect('http://localhost:3000/Dashboard');
  };

  });
}
})
});


module.exports = router;
