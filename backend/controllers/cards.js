const { AccessDeniedError } = require('../errors/access-denied-error');
const { BadRequestError } = require('../errors/bad-request-error');
const { NotFoundError } = require('../errors/not-found-error');
const Card = require('../models/cards');

const getCards = (req, res, next) => {
  Card.find({})
    .orFail(() => { throw new NotFoundError('Карточки не найдены'); })
    .populate(['owner', 'likes'])
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequestError('Неправильный запрос'));
      }
      next(e);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const id = req.user._id;

  Card.create({
    name,
    link,
    owner: id,
  })
    .then((card) => card.populate(['owner']))
    .then((card) => res.status(201).send({ data: card }))
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequestError('Неправильный запрос'));
      }
      next(e);
    });
};

const deleteCard = (req, res, next) => {
  const id = req.params.cardId;
  Card.findById(id)
    .populate(['owner'])
    .orFail(() => { throw new NotFoundError('Карточка не найдена'); })
    .then((c) => {
      const ownerId = c.owner._id.toString().replace(/ObjectId\("(.*)"\)/, '$1');
      if (!(ownerId === req.user._id)) {
        throw new AccessDeniedError('Вы не можете удалить не свою карточку!');
      }
      Card.deleteOne(c)
        .orFail(() => { throw new NotFoundError('Карточка не найдена'); })
        .then((card) => res.status(200).send({ data: card }));
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequestError('Неправильный запрос'));
      }
      next(e);
    });
};
//     });
// };

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true },
  )
    .orFail(() => { throw new NotFoundError('Карточка не найдена'); })
    .populate(['owner', 'likes'])
    .then((card) => card.populate(['owner', 'likes']))
    .then((card) => res.status(200).send({ data: card }))
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequestError('Неправильный запрос'));
      }
      next(e);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: { likes: req.user._id },
    },
    { new: true },
  )
    .orFail(() => { throw new NotFoundError('Карточка не найдена'); })
    .populate(['owner', 'likes'])
    .then((card) => card.populate(['owner', 'likes']))
    .then((card) => res.status(200).send({ data: card }))
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequestError('Неправильный запрос'));
      }
      next(e);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
