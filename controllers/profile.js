module.exports = {
  get: (req, res) => res.send(req.user),
  authCheck(req, res, next) {
    if (!req.user) {
      res.redirect('/auth/google');
    } else {
      next();
    }
  }
};
