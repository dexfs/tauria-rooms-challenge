import { Router } from 'express';
import { validate } from 'express-validation';

import IndexController from './controllers/IndexController';
import authValidation from './validations/authValidation';

const authRouter = Router();

authRouter.post(
  '/',
  validate(authValidation, {}, {}),
  IndexController.authenticate,
);

export default authRouter;
