const DB = require("../../models");
const { MESSAGE } = require("../../helpers/constant.helper");
const { response } = require("../../helpers");

const helpers = {};

const controllers = {
  createTenant: async (req, res) => {

    if (req?.user?._id) {
      req.body = { ...req.body, userId: req.user._id };
    }

    let { city, nearByLocation,
      totalPerson, startDate,
      contactPersonName, contactPersonEmail,
      contactPersonNumber, duration, durationType, 
      dietary, accomodationType } = req.body

    req.body.sharingMessage =
      `**Looking for ${accomodationType ? accomodationType : "" } " Accommodation"** in ${city} ${nearByLocation ? "near by " + nearByLocation : ""}
    for ${totalPerson} person from ${startDate} 
     ${dietary ? "Preferable " + dietary : ""} 
    ${duration && durationType ? "Preferable duration " + duration + durationType : ""}
    ${nearByLocation ? "near by" + nearByLocation : ""}
    Please DM ${contactPersonName} on ${contactPersonNumber} or 
    email at ${contactPersonEmail}.`
    
    //* create Tenant
    await DB.TENANT.create(req.body);

    return response.OK({
      res,
      message: MESSAGE.SUCCESS,
      payload: req.body,
    });
  },

  getTenant: async (req, res) => {
    //* check if TENANT already exists by name
    let query = { isActive: true };

    if (req.query._id) {
      query = { _id: req.query._id };
    }
    if (req.query.name) {
      query = { $regex: req.query.name, $options: "i" };
    }
    const categoryExists = await DB.TENANT.find(query);
    if (!categoryExists)
      return response.NO_CONTENT_FOUND({
        res,
        message: MESSAGE.NOT_FOUND,
        payload: {},
      });

    return response.OK({
      res,
      message: MESSAGE.SUCCESS,
      payload: categoryExists,
    });
  },

  updateTenant: async (req, res) => {
    //* check if category already exists by name

    const categoryExists = await DB.CATEGORY.findOneAndUpdate(
      { _id: req.query._id },
      { $set: req.body },
      { new: true }
    );
    if (!categoryExists)
      return response.NOT_FOUND({
        res,
        message: MESSAGE.NOT_FOUND,
        payload: {},
      });

    //* create category
    // await DB.CATEGORY.create(req.body);

    return response.OK({
      res,
      message: MESSAGE.SUCCESS,
      payload: req.body,
    });
  },

  deleteTenant: async (req, res) => {
    //* check if category already exists by name

    const categoryExists = await DB.CATEGORY.findOneAndUpdate(
      { _id: req.query._id },
      { $set: { isActive: false } },
      { new: true }
    );
    if (!categoryExists)
      return response.NOT_FOUND({
        res,
        message: MESSAGE.NOT_FOUND,
        payload: {},
      });

    //* create category
    // await DB.CATEGORY.create(req.body);

    return response.OK({
      res,
      message: MESSAGE.SUCCESS,
      payload: req.body,
    });
  },
};

module.exports = { helpers, controllers };
