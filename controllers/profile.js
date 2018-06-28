module.exports = {
  get: (req, res) => res.send(req.user),
  authCheck(req, res, next) {
    if (!req.user) {
      res.send(null);
    } else {
      next();
    }
  }
};
