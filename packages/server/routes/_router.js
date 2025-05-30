const { checkAuth } = require('../middleware/auth');

const authRoutes = require('./Auth');
const resourceRoutes = require('./Resource');
const userRoutes = require('./User');
const translationsRoute = require('./Translations');
const artistRoutes = require('./Artist');
const bookingRoutes = require('./Booking');
const proceduresRoutes = require('./Procedures');

module.exports = function (app) {
  app.use('/', authRoutes);
  app.use('/resource', resourceRoutes);
  app.use('/translations', translationsRoute);
  app.use('/artist', artistRoutes);
  app.use('/procedures', proceduresRoutes);

  app.use(checkAuth);
  app.use('/user', userRoutes);
  app.use('/booking', bookingRoutes);
  app.use('/artist', artistRoutes);
};
