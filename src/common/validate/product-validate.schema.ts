import * as Joi from '@hapi/joi';

export const productSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  price: Joi.number().required(),
});