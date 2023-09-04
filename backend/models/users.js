const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validator = require('validator');
const InvalidDataError = require('../errors/invalid-data-error');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validata: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false, toJSON: { useProjection: true }, toObject: { useProjection: true } });

userSchema.post('save', (doc) => {
  const docObj = doc.toObject();
  // eslint-disable-next-line dot-notation
  delete docObj['password'];
  return docObj;
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new InvalidDataError('Неправильный email или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new InvalidDataError('Неправильный email или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
