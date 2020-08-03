import { Joi } from 'express-validation';

export default {
  body: Joi.object({
    currentPassword: Joi.string().optional(),
    newPassword: Joi.string().optional(),
    mobileToken: Joi.string().optional(),
  }),
};
