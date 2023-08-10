const _ = require('lodash');
const { Task, Topic } = require('../db/models')

module.exports = {
  getTasksByTopic: async (req, res, next) => {
    // получение всех заданий конкретной темы,
    const { params: { topicId }} = req;
    try {
      const tasks = await Task.findAll({
        raw: true,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        where: {
          topicId: 1
        },
        include: {
          model: Topic,
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'id']
          }
        },
        where: { topicId }
      })
      if(!tasks) {
        return res.status(500).send('DB Error')
      }
      res.status(200).send(tasks)
    } catch (error) {
      next(error) 
    }
  },
  getTopicTask: async (req, res, next) => {
    // получение данных о задаче вместе с данными о теме, к которой она относится
    const { params: { taskId }} = req;
    try {
      const taskDataById = await Task.findByPk(taskId, {
        raw: true,
        include: {
          model: Topic,
        }
      })
      // return res.status(200).send(taskDataById)
      if(!taskDataById) {
        return res.status(404).send('Tasks not found')
      }
      res.status(200).send(taskDataById)
    } catch (error) {
      next(error)
    }
  },
  createTask: async (req, res, next) => {
    const { body } = req;
    try {
      const newTask = await Task.create(body);
      if(!newTask) {
        return res.status(500).send('DB Error')
      }
      const preparedTask = _.omit(newTask.get(), ['updatedAt'])

      res.status(201).send(preparedTask)
    } catch (error) {
      next(error)
    }
  }
}