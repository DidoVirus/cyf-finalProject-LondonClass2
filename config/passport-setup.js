const passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var keys = require('./keys');
var dbs = require('./db.js');
var pool = dbs.getPool();

//serialising user after done method to create a cookie
passport.serializeUser((currentUser, done) => {
  done(null, currentUser.user_id);
});

//deseriaing a user and testing the id object of the user
passport.deserializeUser((id, done) => {
  pool.connect((error, db, closeConn) => {
    if (error) {
      return console.log(error);
    } else {
      db.query('SELECT * FROM users WHERE user_id = $1', [id], (error, userResult) => {
        closeConn();

        done(error, userResult.rows[0]);
        if (error) {
          return console.log(error);
        }
      })
    }
  });
})

//setting up a passport GitHubStrategy to authoticate the user
passport.use(new GitHubStrategy({
  clientID: keys.github.GITHUB_CLIENT_ID,
  clientSecret: keys.github.GITHUB_CLIENT_SECRET,
  callbackURL: '/auth/github/redirect'
}, (accessToken, refreshToken, profile, done) => {

  //connectiong to the database to store user creditials from github
  pool.connect((error, db, done2) => {
    if (error) {
      return console.log(error);
    }
    //checking if the user already exits or not
    else {
      db.query('SELECT * FROM users WHERE github_id = $1', [profile.id], (error, user) => {
        console.log("Selecting user from DB", profile);
        done2();
        const currentUser = user.rows[0];
        if (error) {
          return console.log(error);
        }
        //if the user exits in database we notified
        else {
          if (user.rowCount) {
            // console.log("User exists in DB");
            done(null, currentUser);
          }
          //inserting a new user into database
          else {
            console.log("Inserting user into DB");
            db.query('INSERT INTO users (github_id, github_username,github_profile_url,github_email,github_avatar_url) VALUES ($1, $2,$3,$4,$5) RETURNING *',
              [profile.id, profile._json.login, profile._json.url, profile._json.email, profile._json.avatar_url], (error, insertProfile) => {
                if (error) {
                  return console.log(error);
                }
                done(null, insertProfile.rows[0]);
              })
          }
        }
      })
    }

  });
}));
