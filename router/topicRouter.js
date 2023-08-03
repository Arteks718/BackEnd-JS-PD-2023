const { Router } = require("express");
const { topicController } = require("../controller");

const topicRouter = Router();

topicRouter
  .route("/")
  .get()
  .post(topicController.createTopic);

topicRouter.get('/:topicId/tasks', topicController.getTopicTasks)
module.exports = topicRouter;