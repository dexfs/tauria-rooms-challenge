import { Joi } from 'express-validation';

export default {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
