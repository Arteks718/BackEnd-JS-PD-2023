const { Router } = require("express");
const { usersController } = require("../controllers/index.js");
const { validate, paginate } = require("../middleware");

const usersRouter = Router();

usersRouter
  .route("/")
  .get(paginate.paginateUser, usersController.getUsers)
  .post(validate.userValidation, usersController.createUser);

usersRouter
  .route("/:userId")
  .get(usersController.getUserById)
  .patch(usersController.updateUserById)
  .delete(usersController.deleteUserById);

module.exports = usersRouter;
