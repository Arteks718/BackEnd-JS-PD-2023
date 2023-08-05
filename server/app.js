const express = require('express');
const cors = require('cors');
const errorHandlers = require('./middleware')
const appRouter = require('./routes')
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json())
app.use('/api', appRouter)
app.use(errorHandlers.errorHandler);

module.exports = app;