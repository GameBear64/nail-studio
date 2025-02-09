const bcrypt = require('bcryptjs');

const db = require('./_database');
const { UserRoles, Shifts } = require('../toolbox/consts');

const artistSchema = db.get('users').schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    biography: {
      type: String,
      // required: true,
      default: '',
    },
    yearsExperience: {
      type: Number,
      // required: true,
      default: 2,
    },
    picture: {
      type: String,
      // required: true,
      default: '',
    },
    gallery: {
      type: Array,
      default: [],
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
      default: UserRoles.ARTIST,
    },
    procedures: {
      type: Array,
      populate: 'procedures',
      // required: true,
      default: [],
    },
    shift: {
      type: String,
      enum: Object.values(Shifts),
      default: Shifts.FULL,
    },
    // bookings: {
    //   type: Array,
    //   default: [],
    //   populate: 'bookings',
    // },
    passwordChangedAt: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

artistSchema.hook(['pre-create', 'pre-update'], (user) => {
  if (user.hasOwnProperty('password')) {
    user.password = bcrypt.hashSync(user.password, 10);
    user.passwordChangedAt = Date.now() - 1000;
  }

  return user;
});

module.exports = artistSchema;
