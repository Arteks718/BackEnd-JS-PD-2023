import express, { Request } from "express";
import path from "path";
import { userController } from "./controllers/userController.js";
// import users from "./users.json" assert { type: 'json'}
const app = express();

app.use(express.json());
app.use("/", express.static("public"));

//CRUD for user

// get all users
app.get("/users", userController.getAllUsers)
// get user by id
app.get("/users/:id", userController.getUserById)
// create new user
app.post("/users", userController.createUser)
// update user
app.patch("/users/:id", userController.updateUser)
// delete user
app.delete("/users/:id", userController.deleteUser)

export default app;
