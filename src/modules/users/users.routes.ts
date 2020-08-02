import { Router } from 'express';
import { validate } from 'express-validation';
import isAuthorized from '@modules/users/middleware/isAuthorized';
import UsersController from './controllers/UsersController';
import UserRoomsController from './controllers/UserRoomsController';

import updateUserValidation from './validations/updateUserValidation';
import createUserValidation from './validations/createUserValidation';

const usersRouter = Router();

usersRouter.get('/', UsersController.index);
usersRouter.get('/:username/rooms', UserRoomsController.index);
usersRouter.get('/:username', UsersController.show);

usersRouter.post(
  '/register',
  validate(createUserValidation, {}, {}),
  UsersController.create,
);

usersRouter.put(
  '/',
  isAuthorized,
  validate(updateUserValidation, {}, {}),
  UsersController.update,
);

usersRouter.delete('/', isAuthorized, UsersController.delete);

export default usersRouter;
