const express = require('express');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { addCardValidator, cardIdValidator } = require('../middlewares/card-validator');

const cardRouter = express.Router();

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', addCardValidator, createCard);
cardRouter.delete('/cards/:cardId', cardIdValidator, deleteCard);
cardRouter.put('/cards/:cardId/likes', cardIdValidator, likeCard);
cardRouter.delete('/cards/:cardId/likes', cardIdValidator, dislikeCard);

module.exports = cardRouter;
