import Joi from 'joi';

export const createCustomerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().allow('', null),
  company: Joi.string().allow('', null),
});

export const updateCustomerSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  email: Joi.string().email(),
  phone: Joi.string().allow('', null),
  company: Joi.string().allow('', null),
}).min(1);


