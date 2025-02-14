const db = require('./_database');

const procedureSchema = db.get('procedures').schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      // Minutes
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    inlineId: true,
  },
);

module.exports = procedureSchema;
