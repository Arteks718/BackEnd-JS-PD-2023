"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const appRouter = Router();
appRouter.use('/users', usersRouter);
appRouter.use('/tasks', productsRouter);
module.exports = appRouter;
