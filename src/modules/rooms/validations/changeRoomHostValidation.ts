import { Joi } from 'express-validation';

export default {
  body: Joi.object({
    roomId: Joi.string().required().uuid(),
    newHost: Joi.string().required().uuid(),
  }),
};
