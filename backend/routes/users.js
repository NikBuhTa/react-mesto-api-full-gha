const express = require('express');
const {
  getUsers, getUser, updateProfile, updateAvatar, getUserInfo,
} = require('../controllers/users');
const { updateUserInfoValidator, updateAvatarValidator, userIdValidator } = require('../middlewares/user-validation');

const userRouter = express.Router();

userRouter.get('/users/me', getUserInfo);
userRouter.get('/users', getUsers);
userRouter.patch('/users/me', updateUserInfoValidator, updateProfile);
userRouter.patch('/users/me/avatar', updateAvatarValidator, updateAvatar);
userRouter.get('/users/:id', userIdValidator, getUser);
module.exports = userRouter;
