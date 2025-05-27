const router = require('express').Router();

const joi = require('joi');

const { joiValidate } = require('../middleware/validation');
const { checkAdmin, checkAuth } = require('../middleware/auth');
const translationSchema = require('../database/TranslationSchema');

router
  .route('/')
  .get((req, res) => {
    const result = translationSchema.find({});

    res.status(200).json(result);
  })
  .post(
    checkAuth,
    checkAdmin,
    joiValidate({
      bulgarian: joi.string().required(),
      english: joi.string().required(),
    }),
    (req, res) => {
      const result = translationSchema.create(req.body);

      res.status(201).json({ ...result, ...req.body });
    },
  )
  .all((_req, res) => {
    res.status(405).json('Use another method');
  });

router
  .route('/:id')
  .patch(
    checkAuth,
    checkAdmin,
    joiValidate({
      bulgarian: joi.string().required(),
      english: joi.string().required(),
    }),
    (req, res) => {
      const result = translationSchema.update(req.params.id, req.body);
      res.status(201).json(result);
    },
  )
  .delete(checkAuth, checkAdmin, (req, res) => {
    translationSchema.destroy(req.params.id);
    res.status(200).json();
  })
  .all((_req, res) => {
    res.status(405).json('Use another method');
  });

module.exports = router;
