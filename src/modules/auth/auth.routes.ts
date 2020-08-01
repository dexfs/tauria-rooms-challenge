import { Router } from 'express';
import { validate } from 'express-validation';

import IndexController from './controllers/IndexController';
import authValidation from './validations/authValidation';

const authRouter = Router();
const authController = new IndexController();

authRouter.post(
  '/',
  validate(authValidation, {}, {}),
  authController.authenticate,
);

export default authRouter;
