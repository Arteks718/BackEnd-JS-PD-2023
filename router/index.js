const { Router } = require('express')
const phoneRouter = require('./phoneRouter.js')
const tasksRouter = require('./tasksRouter.js')
const usersRouter = require('./usersRouter.js')
const topicsRouter = require('./topicsRouter.js')
const classesRouter = require('./classesRouter.js')

const appRouter = Router()

appRouter.use('/phones', phoneRouter)
appRouter.use('/tasks',tasksRouter)
appRouter.use('/users', usersRouter)
appRouter.use('/topics', topicsRouter)
appRouter.use('/classes', classesRouter)

module.exports = appRouter