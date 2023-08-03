const { Router } = require('express')
const taskRouter = require('./taskRouter.js')
const topicRouter = require('./topicRouter.js')

const appRouter = Router()

appRouter.use('/task', taskRouter)
appRouter.use('/topic', topicRouter)

module.exports = appRouter