const appRouter = require('./routes/index.js');
const express = require('express');

const app = express();
app.use(express.json());
app.use('/api', appRouter);
module.exports = app;
