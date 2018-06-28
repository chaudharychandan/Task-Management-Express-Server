const passport = require('passport');

module.exports = {
  google: {
    saveRequester(req, res, next) {
      req.session.redirect = req.headers.referer;
      next();
    },
    authenticate() {
      return passport.authenticate('google', {
        scope: ['profile']
      });
    },
    authenticateWithCode() {
      return passport.authenticate('google');
    },
    callback(req, res) {
      res.redirect(req.session.redirect);
    },
    logout(req, res) {
      req.logout();
      res.redirect(req.session.redirect);
    }
  }
}
