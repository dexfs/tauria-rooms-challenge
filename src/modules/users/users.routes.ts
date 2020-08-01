import { Router } from 'express';
import { validate } from 'express-validation';
import isAuthorized from '@modules/users/middleware/isAuthorized';
import IndexController from './controllers/IndexController';
import updateUserValidation from './validations/updateUserValidation';
import createUserValidation from './validations/createUserValidation';

const usersRouter = Router();

const userController = new IndexController();

usersRouter.get('/', userController.index);

usersRouter.get('/:username', userController.show);

usersRouter.post(
  '/register',
  validate(createUserValidation, {}, {}),
  userController.create,
);

usersRouter.put(
  '/',
  isAuthorized,
  validate(updateUserValidation, {}, {}),
  userController.update,
);

usersRouter.delete('/', isAuthorized, userController.delete);

export default usersRouter;
