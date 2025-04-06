const router = require('express').Router();

const joi = require('joi');

const { joiValidate, skipIfNoChanges } = require('../middleware/validation');
const { checkAdmin, checkAuth } = require('../middleware/auth');
const { UserRoles } = require('../toolbox/consts');
const { omit } = require('../toolbox/utils');

const { artist } = require('../database/UserSchema');

router
  .route('/')
  .get((req, res) => {
    const results = artist.find({ role: UserRoles.ARTIST });

    res.status(200).json(results);
  })
  .post(
    checkAuth,
    checkAdmin,
    joiValidate({
      name: joi.string().min(3).max(50).required(),
      email: joi.string().min(10).max(255).required().email(),
      biography: joi.string().min(3).max(1000).required(),
      yearsExperience: joi.number().required(),
      picture: joi.string().required(),
      gallery: joi.array().items(joi.string()).optional(),
      // procedures: joi.array().items(joi.string()).optional(),
      phone: joi.number().required(),
      // shift: joi
      //   .string()
      //   .valid(...Object.values(Shifts))
      //   .optional(),
      password: joi.string().min(8).max(255).required(),
      confirm_password: joi.string().valid(joi.ref('password')).required(),
    }),
    (req, res) => {
      const data = artist.create(omit(req.body, ['confirm_password']));

      res.status(201).json(data);
    },
  )
  .all((_req, res) => {
    res.status(405).json('Use another method');
  });

router
  .route('/:id')
  .get((req, res) => {
    const results = artist.read(req.params.id);
    res.status(200).json(results);
  })
  .patch(
    checkAuth,
    checkAdmin,
    skipIfNoChanges,
    joiValidate({
      name: joi.string().min(3).max(50).optional(),
      email: joi.string().min(10).max(255).optional(),
      biography: joi.string().min(3).max(1000).optional(),
      yearsExperience: joi.number().optional(),
      picture: joi.string().optional(),
      gallery: joi.array().items(joi.string()).optional(),
      // procedures: joi.array().items(joi.string()).optional(),
      phone: joi.number().optional(),
      // shift: joi
      //   .string()
      //   .valid(...Object.values(Shifts))
      //   .optional(),
    }),
    (req, res) => {
      const data = artist.update(req.params.id, req.body);

      // check if old image is edited, remove old image if so

      return res.status(200).json(data);
    },
  )
  .delete(checkAuth, checkAdmin, (req, res) => {
    artist.destroy(req.params.id);
    return res.status(200).json();
  })
  .all((_req, res) => {
    res.status(405).json('Use another method');
  });

module.exports = router;
