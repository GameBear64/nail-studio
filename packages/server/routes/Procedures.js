const router = require('express').Router();

const joi = require('joi');

const { joiValidate } = require('../middleware/validation');
const procedureSchema = require('../database/ProcedureSchema');
const { checkAdmin, checkAuth } = require('../middleware/auth');

router
  .route('/')
  .get((req, res) => {
    const result = procedureSchema.find({});

    res.status(200).json(result);
  })
  .post(
    checkAuth,
    checkAdmin,
    joiValidate({
      name: joi.string().required(),
      description: joi.string().required(),
      price: joi.number().required(),
      duration: joi.number().required(), // In minutes!
    }),
    (req, res) => {
      const result = procedureSchema.create(req.body);
      res.status(201).json(result);
    },
  )
  .all((_req, res) => {
    res.status(405).json('Use another method');
  });

router
  .route('/:id')
  .post(
    checkAuth,
    checkAdmin,
    joiValidate({
      name: joi.string().optional(),
      description: joi.string().optional(),
      price: joi.number().optional(),
      duration: joi.number().optional(), // In minutes!
    }),
    (req, res) => {
      const result = procedureSchema.update(req.params.id, req.body);
      res.status(201).json(result);
    },
  )
  .delete(checkAuth, checkAdmin, (req, res) => {
    procedureSchema.destroy(req.params.id);
    res.status(200).json();
  })
  .all((_req, res) => {
    res.status(405).json('Use another method');
  });

module.exports = router;
