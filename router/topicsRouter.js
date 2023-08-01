const { Router } = require('express')
const { topicsController } = require('../controllers')

const topicsRouter = Router()

topicsRouter.get('/:topicId', topicsController.getTopicById)

module.exports = topicsRouter