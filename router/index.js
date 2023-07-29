const { Router } = require('express')
const phoneRouter = require('./phoneRouter.js')
const tasksRouter = require('./tasksRouter.js')
const usersRouter = require('./usersRouter.js')

const appRouter = Router()

appRouter.use('/phones', phoneRouter)
appRouter.use('/tasks',tasksRouter)
appRouter.use('/users', usersRouter)

module.exports = appRouter