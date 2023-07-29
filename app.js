const appRouter = require("./router/index.js");
const express = require("express");

const app = express();
app.use(express.json());
~
app.get("/test", (req, res, next) => {
  console.log(new Date())
  next()
}, (req, res) => {
  res.send(req.query);
});

app.use("/api", appRouter);
module.exports = app;
