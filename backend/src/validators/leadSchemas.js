import Joi from 'joi';

export const createLeadSchema = Joi.object({
  title: Joi.string().min(2).max(200).required(),
  description: Joi.string().allow('', null),
  status: Joi.string().valid('New', 'Contacted', 'Converted', 'Lost').default('New'),
  value: Joi.number().min(0).default(0),
});

export const updateLeadSchema = Joi.object({
  title: Joi.string().min(2).max(200),
  description: Joi.string().allow('', null),
  status: Joi.string().valid('New', 'Contacted', 'Converted', 'Lost'),
  value: Joi.number().min(0),
}).min(1);


