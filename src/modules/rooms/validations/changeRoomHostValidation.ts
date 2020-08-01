import { Joi } from 'express-validation';

export default {
  body: Joi.object({
    roomId: Joi.string().required(),
    newHost: Joi.string().required(),
  }),
};
