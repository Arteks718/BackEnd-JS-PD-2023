const express = require('express');
const appRouter = require('./router');
const { errorHandlers } = require('./middleware');
const app = express();

app.use(express.json())
app.use('/api', appRouter)
app.use(errorHandlers.errorHandler)

module.exports = app