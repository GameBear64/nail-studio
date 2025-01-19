const router = require('express').Router();

const bcrypt = require('bcryptjs');
const joi = require('joi');

const { joiValidate, skipIfNoChanges } = require('../middleware/validation');
const { pick } = require('../toolbox/utils');
const userSchema = require('../database/UserSchema');

router
  .route('/')
  .get((req, res) => {
    const userFile = userSchema.read(req.authUser.id);
    return res.status(200).json({ id: req.authUser.id, ...pick(userFile, ['name', 'role']) });
  })
  .patch(
    skipIfNoChanges,
    joiValidate({
      name: joi.string().min(3).max(50).required(),
      email: joi.string().min(10).max(255).required().email(),
      phone: joi
        .string()
        .length(10)
        .pattern(/^[0-9]+$/),
    }),
    (req, res) => {
      userSchema.update(req.apiUserId, req.body);

      return res.status(200).json();
    },
  )
  .delete(joiValidate({ password: joi.string().min(8).max(255).required() }), async (req, res) => {
    // ensured existence by auth
    const [, userFile] = userSchema.read(req.authUser.id);

    let validPassword = await bcrypt.compare(userFile.password, req.body.password);
    if (!validPassword) return res.status(404).json('Incorrect password');

    userSchema.destroy(req.authUser.id);

    res.clearCookie('jwt');
    return res.status(200).json();
  })
  .all((_req, res) => {
    res.status(405).json('Use another method');
  });

router.route('/logout').get((req, res) => {
  res.clearCookie('jwt');
  return res.status(200).json();
});

router
  .route('/password-reset')
  .post() //todo: later
  .all((_req, res) => {
    res.status(405).json('Use another method');
  });

module.exports = router;
