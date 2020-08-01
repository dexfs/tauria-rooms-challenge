import { Router } from 'express';
import { validate } from 'express-validation';

import isAuthorized from '@modules/users/middleware/isAuthorized';
import IndexController from './controllers/IndexController';
import createRoomValidation from './validations/createRoomValidation';
import changeRoomHostValidation from './validations/changeRoomHostValidation';

const roomsRouter = Router();
const roomsController = new IndexController();

roomsRouter.get('/', roomsController.index);
roomsRouter.post(
  '/',
  isAuthorized,
  validate(createRoomValidation, {}, {}),
  roomsController.create,
);
roomsRouter.post(
  '/change-room-host',
  isAuthorized,
  validate(changeRoomHostValidation, {}, {}),
  roomsController.update,
);

export default roomsRouter;
