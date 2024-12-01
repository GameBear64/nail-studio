const { checkAuth } = require('../middleware/auth');

const authRoutes = require('./Auth');
const resourceRoutes = require('./Resource');

module.exports = function (app) {
  app.use('/', authRoutes);
  app.use('/resource', resourceRoutes);

  app.use(checkAuth);
};
