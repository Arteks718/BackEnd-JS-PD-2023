const _ = require('lodash');
const { Topic, Task } = require("../db/models");

module.exports = {
  getTopicTasks: async (req, res, next) => {
    const {
      params: { topicId },
    } = req;
    try {
      // получение всех заданий конкретной темы,
      // const tasks = await Topic.findByPk(topicId, {
      //   raw: true,
      //   attributes: {
      //     exclude: ['createdAt', 'updatedAt']
      //   },
      //   include: {
      //     model: Task,
      //     attributes: {
      //       exclude: ['createdAt', 'updatedAt']
      //     }
      //   }
      // })
      const tasks = await Topic.findByPk(topicId, {
        raw: true,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: Task,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      });

      if (!tasks) {
        return res.status(404).send("No tasks found");
      }
      res.status(200).send(tasks);
    } catch (error) {
      // next(error)
      console.log(error);
    }
  },
  createTopic: async (req, res, next) => {
    const { body } = req;
    console.log(body);
    try {
      const newTopic = await Topic.create(body);
      if (!newTopic) {
        return res.status(400).send("DB Error");
      }
      const preparedTopic = _.omit(newTopic.get(), ['updatedAt'])
      res.status(201).send(preparedTopic);
    } catch (error) {
      // console.log(error)
    }
  },
};
