const { checkAuth } = require('../middleware/auth');

const authRoutes = require('./Auth');
const resourceRoutes = require('./Resource');
const userRoutes = require('./User');
const bookingRoutes = require('./Booking');

module.exports = function (app) {
  app.use('/', authRoutes);
  app.use('/resource', resourceRoutes);
  app.use(checkAuth);
  app.use('/user', userRoutes);
  app.use('/booking', bookingRoutes);
};
