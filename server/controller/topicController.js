const _ = require('lodash');
const { Topic, Task } = require("../db/models");

module.exports = {
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
      next(error)
    }
  },
};
