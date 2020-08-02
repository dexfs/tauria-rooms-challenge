import { Router } from 'express';
import { validate } from 'express-validation';

import isAuthorized from '@modules/users/middleware/isAuthorized';
import IndexController from './controllers/IndexController';
import createRoomValidation from './validations/createRoomValidation';
import changeRoomHostValidation from './validations/changeRoomHostValidation';
import roomIdValidation from './validations/roomIdValidation';

const roomsRouter = Router();
const roomsController = new IndexController();

roomsRouter.get('/:roomId/info', roomsController.show);
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

roomsRouter.post(
  '/:roomId/join',
  isAuthorized,
  validate(roomIdValidation, {}, {}),
  roomsController.join,
);

roomsRouter.delete(
  '/:roomId/leave',
  isAuthorized,
  validate(roomIdValidation, {}, {}),
  roomsController.leave,
);

export default roomsRouter;
