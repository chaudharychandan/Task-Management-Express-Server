const boards = require('./boards');
const lists = require('./lists');
const auth = require('./auth');
const profile = require('./profile');
const { AuthController } = require('../controllers');

module.exports = (app) => {
  app.use('/api/v1/boards', AuthController.google.isLoggedIn, boards);
  app.use('/api/v1/lists', AuthController.google.isLoggedIn, lists);
  app.use('/auth', auth);
  app.use('/api/v1/profile', AuthController.google.isLoggedIn, profile)
};
