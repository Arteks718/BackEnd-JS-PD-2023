const express = require('express');
const app = express();
const errorHandlers = require('./middleware')
const appRouter = require('./routes')

app.use(express.json())
app.use('/api', appRouter)
app.use(errorHandlers.errorHandler)

module.exports = app;