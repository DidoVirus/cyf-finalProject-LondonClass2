var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var keys = require('./keys');


passport.use(new GitHubStrategy({
    clientID: keys.github.GITHUB_CLIENT_ID,
    clientSecret: keys.github.GITHUB_CLIENT_SECRET,
        callbackURL: '/auth/github/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log('passport callback function fired:');
        console.log(profile);
    }));
