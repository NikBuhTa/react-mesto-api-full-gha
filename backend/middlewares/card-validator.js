const { Joi, celebrate } = require('celebrate');
const { RegExp } = require('../utils/constants');

const addCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(RegExp),
  }),
});

const cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  addCardValidator,
  cardIdValidator,
};
