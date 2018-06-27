const boards = require('./boards');
const lists = require('./lists');
const auth = require('./auth');

module.exports = (app) => {
  app.use('/api/v1/boards', boards);
  app.use('/api/v1/lists', lists);
  app.use('/auth', auth);
};
