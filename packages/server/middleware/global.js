const { sanitizeHTML } = require('../toolbox/utils');

exports.normalizeBodyFields = (req, res, next) => {
  // https://www.npmjs.com/package/request_trimmer
  const trimString = (input) => {
    if (typeof input === 'string') return Number(input) || sanitizeHTML(input?.trim());

    if (input !== null && typeof input === 'object') {
      Object.keys(input).forEach((key) => {
        input[key] = trimString(input[key]);
      });
    }

    return input;
  };

  req.body = trimString(req.body);

  next();
};

exports.getCookies = (req, res, next) => {
  const cookie = req.headers.cookie;

  if (cookie) {
    req.cookies = Object.fromEntries(cookie?.split('; ')?.map((c) => c.split('=')));
  }

  next();
};
