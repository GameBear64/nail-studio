const router = require('express').Router();

const joi = require('joi');

const { joiValidate } = require('../middleware/validation');
const { createJWTCookie } = require('../toolbox/utils');
const { UserRoles } = require('../toolbox/consts');
const { guest } = require('../database/UserSchema');

router
  .route('/')
  .post(
    joiValidate({
      name: joi.string().min(3).max(50).required(),
      phone: joi.number().required(),
    }),
    async (req, res) => {
      let userFile = guest.find((u) => u.phone == req.body.phone, { first: true });

      if (!userFile?.id && userFile.length != 0) {
        if (userFile.role != UserRoles.GUEST) {
          return res.status(409).json('A registered user with this number exists.');
        }
      } else {
        userFile = guest.create(req.body);
      }

      res.cookie('jwt', createJWTCookie({ id: userFile._id, role: userFile.role }), { httpOnly: true });
      res.status(201).json({ id: userFile._id });
    },
  )
  .all((_req, res) => {
    res.status(405).json('Use another method');
  });

module.exports = router;
