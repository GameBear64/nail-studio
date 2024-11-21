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
