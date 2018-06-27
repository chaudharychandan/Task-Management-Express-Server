const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const { google } = require('../config/keys');
const { User } = require('../models');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy({
    callbackURL: '/auth/google/callback',
    clientID: google.clientID,
    clientSecret: google.clientSecret
  }, async (accessToken, refreshToken, profile, done) => {
    const { id, displayName, photos } = profile;
    const currentUser = await User.findOne({ googleId: id});

    if (currentUser) {
      done(null, currentUser);
    } else {
      const user = await new User({
        name: displayName,
        googleId: id,
        photos: photos
      }).save();

      done(null, user);
    }
  })
);
