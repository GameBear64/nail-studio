const { checkAuth } = require('../middleware/auth');

const authRoutes = require('./Auth');

module.exports = function (app) {
  app.use('/', authRoutes);

  app.use(checkAuth);
};
