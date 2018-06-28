const boards = require('./boards');
const lists = require('./lists');
const auth = require('./auth');
const profile = require('./profile');

module.exports = (app) => {
  app.use('/api/v1/boards', boards);
  app.use('/api/v1/lists', lists);
  app.use('/auth', auth);
  app.use('/api/v1/profile', profile)
};
