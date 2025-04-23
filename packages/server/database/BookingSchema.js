const db = require('./_database');

const bookingSchema = db.get('bookings').schema(
  {
    artist: {
      type: String,
      populate: true,
      required: true,
    },
    client: {
      type: String,
      populate: true,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
    procedures: {
      type: Array,
      populate: true,
      required: true,
    },
  },
  {
    timestamps: true,
    inlineId: true,
  },
);

module.exports = bookingSchema;
