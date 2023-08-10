const { Router } = require("express");
const { usersController } = require("../controllers/index.js");
const { validate, paginate } = require("../middleware/index.js");

const usersRouter = Router();

usersRouter
  .route("/")
  .get(paginate.paginateUser, usersController.getUsers)
  .post(validate.validateUserOnCreate, usersController.createUser);

usersRouter
  .route("/:userId")
  .get(usersController.getUserById)
  .patch(validate.validateUserOnUpdate, usersController.updateUserById)
  .delete(usersController.deleteUserById);

module.exports = usersRouter;
