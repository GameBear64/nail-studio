const db = require('../_database');
const { UserRoles } = require('../../toolbox/consts');

const guestSchema = db.get('users').schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: [String, Number],
      required: true,
    },
    role: {
      type: String,
      default: UserRoles.GUEST,
    },
    bookings: {
      type: Array,
      default: [],
      populate: 'bookings',
    },
  },
  {
    timestamps: true,
    inlineId: true,
    namePrefix: 'g-',
  },
);

module.exports = guestSchema;
