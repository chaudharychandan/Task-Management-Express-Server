const boards = require('./boards');
const lists = require('./lists');

module.exports = (app) => {
  app.use('/api/v1/boards', boards);
  app.use('/api/v1/lists', lists);
};
