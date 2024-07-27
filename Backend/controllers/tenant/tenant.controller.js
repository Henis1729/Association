const DB = require("../../models");
const { MESSAGE } = require("../../helpers/constant.helper");
const { response, common } = require("../../helpers");
const helpers = {};

const controllers = {
  createTenant: async (req, res) => {
    try {
      if (req?.user?._id) {
        req.body = { ...req.body, userId: req.user._id };
      }

      //* create Tenant
      let Tenant = await DB.TENANT.create(req.body);

      let message = common.generateTenantMessage(Tenant)
      Tenant.sharingMessage = message;
      Tenant.save()

      return response.OK({
        res,
        message: MESSAGE.SUCCESS,
        payload: req.body,
      });
    } catch (e) {
      return response.CATCH_EXCEPTION_ERROR({
        res,
        message: MESSAGE.INTERNAL_SERVER_ERROR,
        payload: {},
      });
    }
  },

  getTenant: async (req, res) => {

    try {
      //* check TENANT start date should be greateer then today's date
      let query = { isActive: true, startDate: { $gte: (new Date()).toISOString() } };

      // Filter of gender "male", "female", "any"
      if (req?.body?.gender && req?.body?.gender != "any") {
        query = { ...query, gender: req?.body?.gender }
      }

      // Filter of diatery "vegetarian", "non vegetarian", "vegan", "any"
      if (req?.body?.dietary && req?.body?.dietary != "any") {
        query = { ...query, dietary: req?.body?.dietary }
      }

      // Filter of institute Name 
      if (req?.body?.instituteName) {
        query = { ...query, instituteName: { $regex: req?.body?.instituteName, $options: "i" } }
      }

      // Filter of accomodationType "apartment", "house", "basement"
      if (req?.body?.accomodationType && req?.body?.dietary != "any") {
        query = { ...query, accomodationType: req?.body?.accomodationType }
      }

      // Filter of rent
      if (req?.body?.rent) {
        query = { ...query, rent: { $lte: req?.body?.rent } }
      }

      // Filter of city
      if (req?.body?.city) {
        query = { ...query, city: req?.body?.city }
      }

      // Filter of province
      if (req?.body?.province) {
        query = { ...query, province: req?.body?.province }
      }

      // Filter of homeCity
      if (req?.body?.homeCity) {
        query = { ...query, homeCity: req?.body?.homeCity }
      }

      // Filter of homeState
      if (req?.body?.homeState) {
        query = { ...query, homeState: req?.body?.homeState }
      }

      // Filter of homeCountry
      if (req?.body?.homeCountry) {
        query = { ...query, homeCountry: req?.body?.homeCountry }
      }

      // Filter of personalRoom
      if (typeof req?.body?.personalRoom == "boolean") {
        query = { ...query, personalRoom: req?.body?.personalRoom }
      }

      // Filter of laundry
      if (typeof req?.body?.laundry == "boolean") {
        query = { ...query, laundry: req?.body?.laundry }
      }

      const tenants = await DB.TENANT.find(query);
      if (!tenants)
        return response.NO_CONTENT_FOUND({
          res,
          message: MESSAGE.NOT_FOUND,
          payload: {},
        });

      return response.OK({
        res,
        message: MESSAGE.SUCCESS,
        payload: { count: tenants.length, data: tenants },
      });
    }
    catch (e) {
      return response.CATCH_EXCEPTION_ERROR({
        res,
        message: MESSAGE.INTERNAL_SERVER_ERROR,
        payload: {},
      });
    }

  },

  updateTenant: async (req, res) => {
    //* check if category already exists by name

    const tenantExists = await DB.TENANT.findOneAndUpdate(
      { _id: req.query._id },
      { $set: req.body },
      { new: true }
    );
    if (!tenantExists)
      return response.NOT_FOUND({
        res,
        message: MESSAGE.NOT_FOUND,
        payload: {},
      });


    let message = common.generateTenantMessage(tenantExists)
    await DB.TENANT.findOneAndUpdate(
      { _id: req.query._id },
      { $set: { sharingMessage: message } },
    );

    return response.OK({
      res,
      message: MESSAGE.SUCCESS,
      payload: req.body,
    });
  },

  deleteTenant: async (req, res) => {
    //* check if category already exists by name

    const tenantExists = await DB.TENANT.findOneAndUpdate(
      { _id: req.query._id },
      { $set: { isActive: false } },
      { new: true }
    );
    if (!tenantExists)
      return response.NOT_FOUND({
        res,
        message: MESSAGE.NOT_FOUND,
        payload: {},
      });

    return response.OK({
      res,
      message: MESSAGE.SUCCESS,
      payload: req.body,
    });
  },
};

module.exports = { helpers, controllers };
