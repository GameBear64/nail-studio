const router = require('express').Router();

const bcrypt = require('bcryptjs');
const joi = require('joi');

const { joiValidate } = require('../middleware/validation');
const { createJWTCookie, omit } = require('../toolbox/utils');
const { user } = require('../database/UserSchema');

router
  .route('/login')
  .post(
    joiValidate({
      email: joi.string().required(),
      password: joi.string().required(),
    }),
    async (req, res) => {
      const userFile = user.find((u) => u.email == req.body.email, { first: true, omit: [] });
      if (!userFile) return res.status(404).json('User with this email does not exist');

      const validPassword = await bcrypt.compare(req.body.password, userFile.password);
      if (!validPassword) return res.status(403).json('Incorrect password');

      res.cookie('jwt', createJWTCookie({ id: userFile._id, role: userFile.role }), { httpOnly: true });
      res.status(200).json({ id: userFile._id });
    },
  )
  .all((_req, res) => {
    res.status(405).json('Use another method');
  });

router
  .route('/register')
  .post(
    joiValidate({
      name: joi.string().min(3).max(50).required(),
      email: joi.string().min(10).max(255).required().email(),
      phone: joi.number().required(),
      password: joi.string().min(8).max(255).required(),
      confirm_password: joi.string().valid(joi.ref('password')).required(),
    }),
    async (req, res) => {
      const userFile = user.find((u) => u.email == req.body.email, { first: true });
      if (userFile._id) return res.status(409).json('User with this email already exists');

      let registeredUser = user.create(omit(req.body, ['confirm_password']));

      res.cookie('jwt', createJWTCookie({ id: registeredUser._id, role: registeredUser.role }), { httpOnly: true });
      res.status(201).json({ id: registeredUser._id });
    },
  )
  .all((_req, res) => {
    res.status(405).json('Use another method');
  });

module.exports = router;
