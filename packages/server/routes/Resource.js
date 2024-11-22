const router = require('express').Router();

const joi = require('joi');
const sharp = require('sharp');
const shortHash = require('short-hash');

const db = require('../toolbox/database');
const { joiValidate, InfoTypes } = require('../middleware/validation');
const { checkAuth } = require('../middleware/auth');

const turnSizeIntoNumberBeforeValidation = () => (req, res, next) => {
  if (req.query?.size) req.query.size = Number(req.query.size);
  next();
};

router
  .route('/')
  .post(
    checkAuth, // Permission check soon
    joiValidate({
      data: joi.string().required(),
    }),
    async (req, res) => {
      const matches = req.body.data.match(/^data:(.+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return res.status(400).json('Invalid Base64 string');
      }

      const [_, mimeType, base64Data] = matches;

      // Determine the file extension from the MIME type
      const extension = mimeType.split('/')[1];
      if (!extension) return res.status(400).json('Unsupported MIME type');

      const hash = shortHash(base64Data);
      db.get('images').get(req.authUser.id).createFile(`${hash}.${extension}`, Buffer.from(base64Data, 'base64'));

      res.status(201).json({ message: 'File uploaded successfully', path: `${req.authUser.id}/${hash}` });
    }
  )
  .all((_req, res) => {
    res.status(405).json('Use another method');
  });

router
  .route('/:id')
  .get(
    turnSizeIntoNumberBeforeValidation(),
    joiValidate({ id: joi.string().required() }, InfoTypes.PARAMS),
    joiValidate({ size: joi.number().max(500) }, InfoTypes.QUERY),
    async (req, res) => {
      const filePath = `db/images/${req.params.id}.jpg`;

      const currentFile = fs.existsSync(filePath);
      if (!currentFile) return res.status(404).json('File not found');

      if (req.query?.size) {
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        return sharp(filePath).resize(req.query.size, req.query.size, { fit: 'inside' }).pipe(res);
      }

      res.sendFile(path.resolve(filePath));
    }
  )
  .all((_req, res) => {
    res.status(405).json('Use another method');
  });

module.exports = router;
