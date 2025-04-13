const router = require('express').Router();

const joi = require('joi');

const { joiValidate } = require('../middleware/validation');
const bookingSchema = require('../database/BookingSchema');

router
  .route('/')
  .get((req, res) => {
    const result = bookingSchema.find({ client: req.authUser.id });
    res.status(200).json(result);
  })
  .post(
    joiValidate({
      artist: joi.string().required(),
      date: joi.number().required(),
      procedures: joi.array().items(joi.string()).required(),
    }),
    (req, res) => {
      const result = bookingSchema.create({ client: req.authUser.id, ...req.body });
      res.status(201).json(result);
    },
  )
  .all((_req, res) => {
    res.status(405).json('Use another method');
  });

module.exports = router;
