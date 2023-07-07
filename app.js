import express from "express";
// import  from './controllers/userController.js'
// import users from "./users.json" assert { type: 'json'}
const app = express();
app.use(express.json());
app.use("/", express.static("public"));
//CRUD for user
// get all users
export default app;
