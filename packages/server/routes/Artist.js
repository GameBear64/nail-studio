const router = require('express').Router();

const joi = require('joi');

const { joiValidate, skipIfNoChanges } = require('../middleware/validation');
const { checkAdmin } = require('../middleware/auth');
const { UserRoles, Shifts } = require('../toolbox/consts');
const { omit } = require('../toolbox/utils');

const userSchema = require('../database/ArtistSchema');

router
  .route('/')
  .get((req, res) => {
    const results = userSchema.find({ role: UserRoles.ARTIST });
    res.status(200).json(results);
  })
  .post(
    checkAdmin,
    joiValidate({
      name: joi.string().min(3).max(50).required(),
      email: joi.string().min(10).max(255).required().email(),
      biography: joi.string().min(3).max(1000).required(),
      yearsExperience: joi.number().required(),
      picture: joi.string().required(),
      gallery: joi.array().items(joi.string()).optional(),
      phone: joi.number().required(),
      password: joi.string().min(8).max(255).required(),
      shift: joi
        .string()
        .valid(...Object.values(Shifts))
        .optional(),
      confirm_password: joi.string().valid(joi.ref('password')).required(),
    }),
    (req, res) => {
      const [, data] = userSchema.create(omit(req.body, ['confirm_password']));

      res.status(201).json(data);
    },
  )
  .all((_req, res) => {
    res.status(405).json('Use another method');
  });

router
  .route('/:id')
  .get((req, res) => {
    const results = userSchema.read(req.params.id);
    res.status(200).json(results);
  })
  .patch(
    checkAdmin,
    skipIfNoChanges,
    joiValidate({
      name: joi.string().min(3).max(50).optional(),
      email: joi.string().min(10).max(255).optional(),
      biography: joi.string().min(3).max(1000).optional(),
      yearsExperience: joi.number().optional(),
      picture: joi.string().optional(),
      gallery: joi.array().items(joi.string()).optional(),
      phone: joi.number().optional(),
      shift: joi
        .string()
        .valid(...Object.values(Shifts))
        .optional(),
    }),
    (req, res) => {
      const updatedUser = userSchema.update(req.params.id, req.body);

      return res.status(200).json(updatedUser);
    },
  )
  .delete(checkAdmin, (req, res) => {
    userSchema.destroy(req.params.id);
    return res.status(200).json();
  })
  .all((_req, res) => {
    res.status(405).json('Use another method');
  });

module.exports = router;
