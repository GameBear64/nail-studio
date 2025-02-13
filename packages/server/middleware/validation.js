const joi = require('joi');

/**
 * Skips route if nothing has changed
 */
exports.skipIfNoChanges = (req, res, next) => {
  if (Object.keys(req.body).length === 0) return res.status(304).json();
  next();
};

exports.InfoTypes = Object.freeze({
  BODY: 'body',
  PARAMS: 'params',
  QUERY: 'query',
});

// prettier-ignore
exports.joiValidate = (schema, realm = 'body') => (req, res, next) => {
  let validation = joi.object(schema).validate(req[realm], { abortEarly: false });
  
  if (!validation?.error?.details) return next();

  validation = validation.error.details.map(err => [err.context.key, err.message]);
  validation = Object.fromEntries(validation);

  if (validation.error) return res.status(400).json(validation);

  next();
};
