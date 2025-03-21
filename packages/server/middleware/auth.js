const jwt = require('jsonwebtoken');
const { wildcardMatch, pick } = require('../toolbox/utils');
const { noAuthRoutes, UserRoles } = require('../toolbox/consts');
const { user } = require('../database/UserSchema');

exports.checkAuth = async (req, res, next) => {
  let isNoAuthRoute = noAuthRoutes.some((route) => wildcardMatch(route.path, req.path) && route.methods.includes(req.method));
  if (isNoAuthRoute) return next();

  try {
    let decoded = jwt.verify(req.cookies?.jwt, process.env.SECRET);

    const currentUser = user.read(decoded.id);
    if (!currentUser) throw new Error('The user belonging to this token no longer exist.');

    if (currentUser?.passwordChangedAt) {
      let lastChanged = currentUser.passwordChangedAt / 1000;
      if (decoded.iat < lastChanged) throw new Error('User changed password, please log in again.');
    }

    req.authUser = pick(decoded, ['id', 'role']);
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') return res.status(401).json('Not Authorized');

    return res.status(401).json(err.message);
  }
};

exports.checkAdmin = (req, res, next) => {
  if (req?.authUser?.role === UserRoles.ADMIN) return next();

  return res.status(401).json('Not authorized, admin route!');
};

exports.checkArtist = (req, res, next) => {
  if ([UserRoles.ARTIST, UserRoles.ADMIN].includes(req?.authUser?.role)) return next();

  return res.status(401).json('Not authorized, artist route!');
};
