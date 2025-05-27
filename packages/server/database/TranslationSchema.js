const db = require('./_database');

const translationSchema = db.get('translations').schema(
  {
    bulgarian: {
      type: String,
      populate: true,
      required: true,
    },
    english: {
      type: String,
      populate: true,
      required: true,
    },
  },
  {
    inlineId: true,
  },
);

module.exports = translationSchema;
