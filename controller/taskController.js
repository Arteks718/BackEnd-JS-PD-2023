const _ = require('lodash');
const { Task, Topic } = require('../db/models')

module.exports = {
  getTopicTasks: async (req, res, next) => {
    const { params: { topicId }} = req;
    try {
      const tasks = await Task.findByPk(topicId, {
        raw: true,
        include: {
          model: Topic,
          attributes: {
            exclude: ['updatedAt']
          }
        }
      })
      if(!tasks) {
        return res.status(500).send('DB Error')
      }
      res.status(200).send(tasks)
    } catch (error) {
     console.log(error) 
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
      console.log(error)
    }
  }
}