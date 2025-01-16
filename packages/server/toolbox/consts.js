exports.noAuthRoutes = [
  { path: '/auth/*', methods: ['POST'] },
  { path: '/recourse/*', methods: ['GET'] },
  { path: '/favicon.ico', methods: ['GET'] },
];

exports.UserRoles = Object.freeze({
  USER: 'user',
  ARTIST: 'artist',
  ADMIN: 'admin',
});

exports.Shifts = Object.freeze({
  FULL: 'Full',
  MORNING: 'Morning',
  AFTERNOON: 'Afternoon',
});

// Maybe?
exports.Appointment = Object.freeze({
  PENDING: 'Pending',
  ACCEPTED: 'Accepted',
  COMPLETED: 'Completed',
  CANCELED: 'Canceled',
});
