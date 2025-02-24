const router = require('express').Router();

const joi = require('joi');

const { joiValidate } = require('../middleware/validation');
const db = require('../database/_database');

router
  .route('/')
  .get(async (req, res) => {
    const result = db.get('galleries').data;

    return res.status(200).json(result);
  })
  .all((_req, res) => {
    res.status(405).json('Use another method');
  });

router
  .route('/:group')
  .get(async (req, res) => {
    const result = db.get('galleries').get(req.params.group).data;

    return res.status(200).json(result);
  })
  .patch(
    joiValidate({
      images: joi.array().items(joi.string()).optional(),
    }),
    async (req, res) => {
      db.get('galleries').set(req.params.group, req.body.images);

      return res.status(200).json();
    },
  )
  .all((_req, res) => {
    res.status(405).json('Use another method');
  });

module.exports = router;
