const passport = require('passport');

module.exports = {
  google: {
    authenticate() {
      return passport.authenticate('google', {
        scope: ['profile']
      });
    },
    authenticateWithCode() {
      return passport.authenticate('google');
    },
    callback() {

    }
  }
}
