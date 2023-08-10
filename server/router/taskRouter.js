const { Router } = require('express');
const { taskController } = require('../controller');
const { validate } = require('../middleware')

const taskRouter = Router()

taskRouter
  .route('/')
  .get()
  .post(validate.validateTaskOnCreate, taskController.createTask)

taskRouter
  .get('/:topicId/topics', taskController.getTasksByTopic)

taskRouter
  .get('/:taskId', taskController.getTopicTask)

module.exports = taskRouter