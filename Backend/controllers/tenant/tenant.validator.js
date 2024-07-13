const Joi = require("joi");

const validator = require("../../middleware/validator").validator;

module.exports = {
  createTenant: validator({
    body: Joi.object({
      name: Joi.string().lowercase().trim().required(),
      description: Joi.string().trim(),
    }),
  }),
  getTenant: validator({
    query: Joi.object({
      name: Joi.string().lowercase().trim(),
      _id: Joi.string(),
    }),
  }),
  updateTenant: validator({
    query: Joi.object({
      _id: Joi.string(),
    }),
    body: Joi.object({
      name: Joi.string().lowercase().trim(),
      description: Joi.string().trim(),
      isMain: Joi.boolean(),
    }),
  }),
  deleteTenant: validator({
    query: Joi.object({
      _id: Joi.string(),
    }),
  }),
};
