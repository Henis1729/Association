const Joi = require("joi");

const validator = require("../../middleware/validator").validator;

module.exports = {
  createOwner: validator({
    body: Joi.object({
      name: Joi.string().lowercase().trim().required(),
      description: Joi.string().trim(),
    }),
  }),
  getOwner: validator({
    query: Joi.object({
      name: Joi.string().lowercase().trim(),
      _id: Joi.string(),
    }),
  }),
  updateOwner: validator({
    query: Joi.object({
      _id: Joi.string(),
    }),
    body: Joi.object({
      name: Joi.string().lowercase().trim(),
      description: Joi.string().trim(),
      isMain: Joi.boolean(),
    }),
  }),
  deleteOwner: validator({
    query: Joi.object({
      _id: Joi.string(),
    }),
  }),
};
