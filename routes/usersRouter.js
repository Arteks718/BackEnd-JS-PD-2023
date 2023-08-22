const { Router } = require('express');
const { userController } = require('../controllers');

const userRouter = Router();

userRouter
  .route('/')
  .get(userController.getUsers)
  .post(userController.createUser);

userRouter
  .route('/:userId')
  .get(userController.getUserById)
  .patch(userController.updateUserById)
  .delete(userController.deleteUserById);

module.exports = userRouter;