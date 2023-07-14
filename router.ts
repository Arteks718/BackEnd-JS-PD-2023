const { Router } = require('express');
const usersRouter = require('./routes/usersRouter')
const productsRouter = require('./routes/productsRouter')

const appRouter = Router();

appRouter.use('/users', usersRouter);
appRouter.use('/products', productsRouter);

module.exports = appRouter;

export {}