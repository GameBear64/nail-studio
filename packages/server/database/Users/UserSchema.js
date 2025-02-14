const bcrypt = require('bcryptjs');

const db = require('../_database');
const { UserRoles } = require('../../toolbox/consts');

const userSchema = db.get('users').schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: [String, Number],
      required: true,
    },
    password: {
      type: String,
      required: true,
      omit: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRoles),
      default: UserRoles.USER,
    },
    bookings: {
      type: Array,
      default: [],
      populate: 'bookings',
    },
    passwordChangedAt: {
      type: Number,
      default: 0,
      omit: true,
    },
  },
  {
    timestamps: true,
    inlineId: true,
    namePrefix: 'u-',
  },
);

userSchema.hook(['pre-create', 'pre-update'], (user) => {
  if (user.hasOwnProperty('password')) {
    user.password = bcrypt.hashSync(user.password, 10);
    user.passwordChangedAt = Date.now() - 1000;
  }

  return user;
});

module.exports = userSchema;
