const { Router } = require("express");
const { usersController } = require("../controllers/index.js");
const { validate } = require('../middleware')

const usersRouter = Router();

usersRouter
  .route("/")
  .get(usersController.getUsers)
  .post(validate.userValidation, usersController.createUser);

usersRouter
  .route("/:userId")
  .get(usersController.getUserById)
  .patch(usersController.updateUserById)
  .delete(usersController.deleteUserById);

module.exports = usersRouter;