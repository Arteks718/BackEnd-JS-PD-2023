const { Router } = require('express')
const powersRouter = require('./powersRouter')
const heroesRouter = require('./heroesRouter')

const appRouter = Router()

appRouter.use('/heroes', heroesRouter)
appRouter.use('/powers', powersRouter)

module.exports = appRouter