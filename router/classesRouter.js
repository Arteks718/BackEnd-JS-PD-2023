const { Router } = require('express')
const { classesController } = require('../controllers')

const classesRouter = Router()

classesRouter.get('/:classId/topics', classesController.getClassesTopics)

module.exports = classesRouter