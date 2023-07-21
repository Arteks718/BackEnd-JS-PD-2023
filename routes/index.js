const { Router } = require('express');
const usersRouter = require('./usersRouter.js')

const appRouter = Router();

appRouter.use('/users', usersRouter)

module.exports = appRouter