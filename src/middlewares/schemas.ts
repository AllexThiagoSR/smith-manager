import Joi from 'joi';

const name = Joi.string().min(3).required();

const price = Joi.string().min(3).required();

const orderId = Joi.number().integer().required();

export const createProductSchema = Joi.object({
  name, price, orderId,
});

export const createOrderSchema = Joi.object({
  userId: Joi.number().integer().required(),
  productIds: Joi.array().min(1).items(Joi.number().integer()).required(),
});

// export default { createProductSchema, createOrderSchema };
