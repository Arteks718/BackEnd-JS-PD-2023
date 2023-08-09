const express = require('express');
const cors = require('cors');
const errorHandlers = require('./middleware')
const appRouter = require('./routes')
const { STATIC_FOLDER } = require('./constants')
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json())
app.use(express.static(STATIC_FOLDER))
app.use('/api', appRouter)
app.use(errorHandlers.errorHandler);

module.exports = app;