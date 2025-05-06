const router = require('express').Router();

const joi = require('joi');

const { joiValidate } = require('../middleware/validation');
const bookingSchema = require('../database/BookingSchema');
const procedureSchema = require('../database/ProcedureSchema');
const { artist: artistSchema, user } = require('../database/UserSchema');

router
  .route('/')
  .get(async (req, res) => {
    const result = bookingSchema.find((booking) => booking.client == req.authUser.id || booking.artist == req.authUser.id);

    // fix in new version of fdb
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

router
  .route('/for/:artistId')
  .get(async (req, res) => {
    const result = bookingSchema.find({ artist: req.params.artistId });

    const bookings = await Promise.all(
      result.map(async (booking) => {
        const procedures = await Promise.all(booking.procedures.map((id) => procedureSchema.read(id)));

        // minutes to seconds
        const duration = procedures.reduce((sum, item) => sum + item.duration, 0) * 60;

        return [booking.date, booking.date + duration];
      }),
    );

    res.status(200).json(bookings);
  })
  .all((_req, res) => {
    res.status(405).json('Use another method');
  });

module.exports = router;
