const { Topic, Classes } = require('../db/models')
const createHttpError = require('http-errors')

module.exports = {
  getTopicById: async (req, res, next) => {
    const { params: { topicId }} = req;
    try {
      const foundTopic = await Topic.findByPk(topicId, {
        raw: true,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'classId']
        },
        include: { 
          model: Classes,
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          },
        }
      })
      if(!foundTopic) {
        return next(createHttpError(404, 'Topic not found'))
      }
      res.status(200).send(foundTopic)
    } catch (error) {
      next(error)
    }
  }
}