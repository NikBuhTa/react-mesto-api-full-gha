const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');
const { NotFoundError } = require('../errors/not-found-error');

router.use(userRouter);
router.use(cardRouter);
router.use((req, res, next) => { next(new NotFoundError('Такой страницы не существует!')); });

module.exports = router;
