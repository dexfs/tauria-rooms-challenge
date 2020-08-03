import { Joi } from 'express-validation';

export default {
  params: Joi.object({
    roomId: Joi.string().required().uuid(),
  }),
};
