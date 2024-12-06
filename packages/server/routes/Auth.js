const router = require('express').Router();

const bcrypt = require('bcryptjs');
const joi = require('joi');
const shortHash = require('short-hash');

const { joiValidate } = require('../middleware/validation');
const { createJWTCookie } = require('../toolbox/utils');
const db = require('../toolbox/database');

router
  .route('/login')
  .post(
    joiValidate({
      email: joi.string().required(),
      password: joi.string().required(),
    }),
    async (req, res) => {
      const hash = shortHash(req.body.email);
      const userFile = await db.get('users').get(hash).data;
      if (!userFile) return res.status(404).json('User with this email does not exist');

      const validPassword = await bcrypt.compare(req.body.password, userFile.password);
      if (!validPassword) return res.status(403).json('Incorrect password');

      res.cookie('jwt', createJWTCookie({ id: hash }), { httpOnly: true });
      res.status(200).json({ id: hash });
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
      const hash = shortHash(req.body.email);
      const userFile = await db.get('users').get(hash).data;
      if (userFile) return res.status(409).json('User with this email already exists');

      db.get('users').createFile(hash, {
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 10),
      });

      res.cookie('jwt', createJWTCookie({ id: hash }), { httpOnly: true });
      res.status(201).json({ id: hash });
    },
  )
  .all((_req, res) => {
    res.status(405).json('Use another method');
  });

module.exports = router;
