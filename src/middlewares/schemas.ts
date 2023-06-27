import Joi from 'joi';

const name = Joi.string().min(3).required();

const price = Joi.string().min(3).required();

const orderId = Joi.number().integer().required();

const createProductSchema = Joi.object({
  name, price, orderId,
});

export default { createProductSchema };
