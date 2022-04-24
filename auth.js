const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy;
require('dotenv').config()

// const GOOGLE_CLIENT_ID = '470405204357-po8lfrp9ukdk79ib293v2upga8ammoog.apps.googleusercontent.com';
// const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
})

passport.deserializeUser(function (user, done) {
    done(null, user.id);
})