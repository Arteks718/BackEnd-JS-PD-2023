const _ = require('lodash');
const { Task } = require('../db/models')

module.exports = {
  getAllTask:async (req, res) => {
    try {
      const foundTasks = await Task.findAll({
        raw: true,
        attributes: { exclude: ['updatedAt']}
      })

      res.status(200).send(foundTasks)
    } catch (error) {
      res.status(500).send('Server error')
    }
  },
  getTaskById:async (req, res) => {
    const { taskId } = req.params
    try {
      const foundTask = await Task.findByPk(taskId,{
        raw: true,
        attributes: { exclude: ['updatedAt']}
      })
      if(!foundTask){
        return res.status(404).send(`Task not found`)
      }
      res.status(200).send(foundTask)
    } catch (error) {
      res.status(500).send('Server error')
    }
  },
  createTask:async (req, res) => {
    const { body } = req;
    try {
      const createdTask = await Task.create(body)
      if(!createdTask) {
        console.log(createdTask)
        return res.status(500).send(`Server error`)
      }
      const preparedTask = _.omit(createdTask.get(), ['updatedAt']);
      res.status(201).send(preparedTask)
    } catch (error) {
      console.log(error)
      res.status(500).send(`Server error`)
    }
  },
  updateTaskById:async (req, res) => {
    const {body, params: {taskId}} = req;
    try {
      const [, [updatedTask]] = await Task.update(body, {
        where: {
          id: taskId
        },
        raw: true,
        attributes: { exclude : ['updatedAt']},
        returning: true
      })

      if(!updatedTask) {
        return res.status(404).send('Task not updated')
      }
      res.status(200).send(updatedTask)
    } catch (error) {
      console.log(error)
      res.status(500).send(`Server error`)
    }
  },
  deleteTaskById:async (req, res) => {
    const { taskId } = req.params;
    try {
      const deletedTaskCount = await Task.destroy({
        where: {
          id: taskId
        }
      })
      if(!deletedTaskCount) {
        return res.status(404).send('Task not deleted');
      }

      res.status(204).end()
    } catch (error) {
      console.log(error)
      res.status(500).send(`Server error`)
    }
  },
}