const appRouter = require("./router/index.js");
const express = require("express");
const { errorHandlers } = require('./middleware')

const app = express();
app.use(express.json());

app.get("/test", (req, res, next) => {
  console.log(new Date())
  next()
}, (req, res) => {
  res.send(req.query);
});

app.use("/api", appRouter);
app.use(errorHandlers.dbErrorHandler, errorHandlers.errorHandler)
module.exports = app;
