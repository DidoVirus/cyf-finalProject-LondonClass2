const router = require('express').Router();

//check if the user not loggied in
const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

//rendering the profile of user
router.get('/', authCheck, (req, res) => {
    res.render('dashBoard', { user: req.user });
    console.log("hello there",req.user);
});

module.exports = router;
