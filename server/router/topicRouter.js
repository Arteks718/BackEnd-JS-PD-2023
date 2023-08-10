const { Router } = require("express");
const { topicController } = require("../controller");

const topicRouter = Router();

topicRouter
  .route("/")
  .get()
  .post(topicController.createTopic);

module.exports = topicRouter;