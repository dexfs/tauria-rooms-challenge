import { Router } from 'express';

import IndexController from './controllers/IndexController';

const usersRouter = Router();

const userController = new IndexController();

usersRouter.get('/', userController.index);

usersRouter.get('/:username', userController.show);

usersRouter.post('/', userController.create);

export default usersRouter;
