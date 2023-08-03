const { Router } = require('express');
const { taskController } = require('../controller');

const taskRouter = Router()

taskRouter
  .route('/')
  .get()
  .post(taskController.createTask)

taskRouter
  .get('/:topicId/tasks', taskController.getTopicTasks)

module.exports = taskRouter