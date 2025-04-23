const router = require('express').Router();

const joi = require('joi');

const { joiValidate } = require('../middleware/validation');
const bookingSchema = require('../database/BookingSchema');
const procedureSchema = require('../database/ProcedureSchema');
const { artist: artistSchema, user } = require('../database/UserSchema');

router
  .route('/')
  .get(async (req, res) => {
    const result = bookingSchema.find({ client: req.authUser.id });

    const populated = await Promise.all(
      result.map(async (booking) => {
        const [artist, client, procedures] = await Promise.all([
          artistSchema.read(booking.artist),
          user.read(booking.client),
          Promise.all(booking.procedures.map((id) => procedureSchema.read(id))),
        ]);

        return {
          ...booking,
          artist,
          client,
          procedures,
        };
      }),
    );

    res.status(200).json(populated);
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
