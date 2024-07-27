const Joi = require("joi");

const validator = require("../../middleware/validator").validator;

module.exports = {
  createTenant: validator({
    body: Joi.object({
      totalPerson: Joi.number(),
      duration: Joi.number(),
      durationType: Joi.string().trim(),
      gender: Joi.string().trim(),
      dietary: Joi.string().trim(),
      accomodationType: Joi.string().trim(),
      rent: Joi.number(),
      instituteName: Joi.string().lowercase().trim(),
      city: Joi.string().lowercase().trim(),
      province: Joi.string().trim(),
      nearByLocation: Joi.string().lowercase().trim(),
      contactPersonName: Joi.string().lowercase().trim().required(),
      contactPersonEmail: Joi.string().email().lowercase().trim().required(),
      contactPersonNumber: Joi.string()
        .pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
        .message('Invalid mobile number')
        .required(),
      contactPersonCallingCode: Joi.string().trim().required(),
      homeCity: Joi.string().lowercase().trim(),
      homeState: Joi.string().lowercase().trim(),
      homeCountry: Joi.string().lowercase().trim(),
      startDate: Joi.string().lowercase().trim(),
    }),
  }),
  getTenant: validator({
    query: Joi.object({
      _id: Joi.string(),
      userId: Joi.string(),
    }),
    body: Joi.object({
      totalPerson: Joi.number(),
      gender: Joi.string().trim(),
      dietary: Joi.string().trim(),
      instituteName: Joi.string().lowercase().trim(),
      accomodationType: Joi.string().trim(),
      rent: Joi.number(),
      city: Joi.string().lowercase().trim(),
      province: Joi.string().trim(),
      homeCity: Joi.string().lowercase().trim(),
      homeState: Joi.string().lowercase().trim(),
      homeCountry: Joi.string().lowercase().trim(),
      startDate: Joi.string().lowercase().trim(),
      personalRoom: Joi.boolean(),
      laundry: Joi.boolean(),
    }),
  }),
  updateTenant: validator({
    query: Joi.object({
      _id: Joi.string(),
    }),
    body: Joi.object({
      totalPerson: Joi.number(),
      duration: Joi.number(),
      durationType: Joi.string().trim(),
      gender: Joi.string().trim(),
      dietary: Joi.string().trim(),
      accomodationType: Joi.string().trim(),
      rent: Joi.number(),
      instituteName: Joi.string().lowercase().trim(),
      city: Joi.string().lowercase().trim(),
      province: Joi.string().trim(),
      nearByLocation: Joi.string().lowercase().trim(),
      contactPersonName: Joi.string().lowercase().trim(),
      contactPersonEmail: Joi.string().email().lowercase().trim(),
      contactPersonNumber: Joi.string()
        .pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
        .message('Invalid mobile number'),
      contactPersonCallingCode: Joi.string().trim(),
      homeCity: Joi.string().lowercase().trim(),
      homeState: Joi.string().lowercase().trim(),
      homeCountry: Joi.string().lowercase().trim(),
      startDate: Joi.string().lowercase().trim(),
    }),
  }),
  deleteTenant: validator({
    query: Joi.object({
      _id: Joi.string(),
    }),
  }),
};
