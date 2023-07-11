"use strict";
const { Router } = require('express');
const usersRouter = require('./routes');
const tasksRouter = require('./routes');
const appRouter = Router();
appRouter.use('/users', usersRouter);
appRouter.use('/tasks', tasksRouter);
module.exports = appRouter;
