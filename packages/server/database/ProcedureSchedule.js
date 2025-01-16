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
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = procedureSchema;
