const express = require("express");
const session = require("express-session")
const passport = require('passport')
const port = 3000
require('./auth');
require('dotenv').config();

const app = express();

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



const key = "AIzaSyA1xda-Xsgwm_TgbOMuHcgkL4k9W_dfGco"

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.get('/', (req, res) => {
    //res.send(`<a href='/auth/google' >Sign In </a>`)
    res.send(`<a href = '/auth/google' class="btn btn-info" role="button">Link Button</a>`)
})

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
)

app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/search',
        failureRedirect: '/unprotected'
    }));

app.get('/search', isLoggedIn, (req, res) => {
    res.send("<h1></h1>")
})

app.get('/unprotected', (req, res) => {
    res.send("<h1>something went wrong</h1>")
})


app.listen(port, () => console.log(`you are at ${port}`));