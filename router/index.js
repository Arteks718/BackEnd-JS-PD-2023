const { Router } = require('express')
const phoneRouter = require('./phoneRouter.js')
const tasksRouter = require('./tasksRouter.js')

const appRouter = Router()

appRouter.use('/phones', phoneRouter)
appRouter.use('/tasks',tasksRouter)

module.exports = appRouter