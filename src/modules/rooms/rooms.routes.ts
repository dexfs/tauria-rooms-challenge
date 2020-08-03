import { Router } from 'express';
import { validate } from 'express-validation';

import isAuthorized from '@modules/users/middleware/isAuthorized';
import RoomsController from './controllers/RoomsController';
import getInfoRoomValidation from './validations/getInfoRoomValidation';
import createRoomValidation from './validations/createRoomValidation';
import changeRoomHostValidation from './validations/changeRoomHostValidation';
import roomIdValidation from './validations/roomIdValidation';

const roomsRouter = Router();

roomsRouter.get(
  '/:roomId/info',
  validate(getInfoRoomValidation, {}, {}),
  RoomsController.show,
);
roomsRouter.post(
  '/',
  isAuthorized,
  validate(createRoomValidation, {}, {}),
  RoomsController.create,
);
roomsRouter.put(
  '/change-room-host',
  isAuthorized,
  validate(changeRoomHostValidation, {}, {}),
  RoomsController.update,
);

roomsRouter.post(
  '/:roomId/join',
  isAuthorized,
  validate(roomIdValidation, {}, {}),
  RoomsController.join,
);

roomsRouter.delete(
  '/:roomId/leave',
  isAuthorized,
  validate(roomIdValidation, {}, {}),
  RoomsController.leave,
);

export default roomsRouter;
