const { Router } = require('express')
const phoneRouter = require('./phoneRouter.js')

const appRouter = Router()

appRouter.use('/phones', phoneRouter)

module.exports = appRouter