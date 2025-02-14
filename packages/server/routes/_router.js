const { checkAuth } = require('../middleware/auth');

const authRoutes = require('./Auth');
const resourceRoutes = require('./Resource');
const userRoutes = require('./User');
const guestRoutes = require('./Guest');
const artistRoutes = require('./Artist');
const bookingRoutes = require('./Booking');
const proceduresRoutes = require('./Procedures');

module.exports = function (app) {
  app.use('/', authRoutes);
  app.use('/resource', resourceRoutes);
  app.use('/artist', artistRoutes);
  app.use('/procedures', proceduresRoutes);
  app.use('/guest', guestRoutes);

  app.use(checkAuth);
  app.use('/user', userRoutes);
  app.use('/booking', bookingRoutes);
  app.use('/artist', artistsRoutes);
};
