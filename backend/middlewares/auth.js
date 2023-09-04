const jwt = require('jsonwebtoken');
const { secretKey } = require('../utils/constants');
const InvalidDataError = require('../errors/invalid-data-error');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  let payload;
  const token = req.cookies.jwt;

  if (!token) {
    next(new InvalidDataError('Неверный токен'));
  }

  try {
    payload = jwt.verify(token, secretKey);
  } catch (e) {
    next(new InvalidDataError('Неверный токен'));
  }
  req.user = payload;
  next();
};
