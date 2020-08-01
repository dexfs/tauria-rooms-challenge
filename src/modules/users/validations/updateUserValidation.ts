import { Joi } from 'express-validation';

export default {
  body: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
    mobileToken: Joi.string().optional(),
  }),
};
