const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const { google } = require('../config/keys');

passport.use(
  new GoogleStrategy({
    callbackURL: '/auth/google/callback',
    clientID: google.clientID,
    clientSecret: google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {

  })
);
