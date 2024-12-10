const router = require('express').Router();

const bcrypt = require('bcryptjs');
const joi = require('joi');
const shortHash = require('short-hash');

const { joiValidate, skipIfNoChanges } = require('../middleware/validation');
const { createJWTCookie, pick } = require('../toolbox/utils');
const db = require('../toolbox/database');

router
  .route('/')
  .get(async (req, res) => {
    if (!req?.authUser?.id) return res.status(404).json();
    const userFile = await db.get('users').get(req.authUser.id).data;
    return res.status(200).json({ id: req.authUser.id, ...pick(userFile, ['name']) });
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
    async (req, res) => {
      // ensured existence by auth
      const userFile = await db.get('users').get(req.apiUserId).data;

      await db
        .get('users')
        .get(req.apiUserId)
        .set({ ...userFile, ...req.body });

      if (req.body?.email) {
        const hash = shortHash(req.body.email);
        await db.get('users').get(req.apiUserId).rename(hash);

        res.cookie('jwt', createJWTCookie({ id: hash }), { httpOnly: true });
      }

      return res.status(200).json();
    },
  )
  .delete(joiValidate({ password: joi.string().min(8).max(255).required() }), async (req, res) => {
    // ensured existence by auth
    const userFile = await db.get('users').get(req.apiUserId);

    let validPassword = await bcrypt.compare(userFile.data.password, req.body.password);
    if (!validPassword) return res.status(404).json('Incorrect password');

    await userFile.remove();

    res.clearCookie('jwt');
    return res.status(200).json();
  })
  .all((_req, res) => {
    res.status(405).json('Use another method');
  });

router.route('/logout').get(async (req, res) => {
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
