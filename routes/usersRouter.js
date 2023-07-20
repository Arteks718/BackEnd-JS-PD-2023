import { Router } from "express";
import usersController from '../controllers/index.js'
const usersRouter = Router();
usersRouter.route("/")
  .get(usersController.getUser)
  .post(usersController.createUser);

usersRouter.route("/:userId")
  .get(usersController.getUserById)
  .patch(usersController.updateUserById)
  .delete(usersController.deleteUserById);

export default usersRouter;
