import { Router } from 'express';
import usersRouter from './usersRouter.js'

const appRouter = Router();

appRouter.use('/users', usersRouter)
export default appRouter;
