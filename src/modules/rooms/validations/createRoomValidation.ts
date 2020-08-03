import { Joi } from 'express-validation';

export default {
  body: Joi.object({
    name: Joi.string().required(),
    capacityLimit: Joi.number().optional().min(5),
  }),
};
