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
      //* check TENANT start date should be greater than today's date
      let query = { 
        isActive: true, 
        isDeleted: { $ne: true },
        startDate: { $gte: new Date() } 
      };

      // Filter of gender "male", "female", "any"
      if (req?.query?.gender && req?.query?.gender !== "any") {
        query.gender = req.query.gender;
      }

      // Filter of dietary "vegetarian", "non vegetarian", "vegan", "any"
      if (req?.query?.dietary && req?.query?.dietary !== "any") {
        query.dietary = req.query.dietary;
      }

      // Filter of institute Name 
      if (req?.query?.instituteName) {
        query.instituteName = { $regex: req.query.instituteName, $options: "i" };
      }

      // Filter of accomodationType "apartment", "house", "basement"
      if (req?.query?.accomodationType && req?.query?.accomodationType !== "any") {
        query.accomodationType = req.query.accomodationType;
      }

      // Filter of rent
      if (req?.query?.rent) {
        query.rent = { $lte: Number(req.query.rent) };
      }

      // Filter of city
      if (req?.query?.city) {
        query.city = { $regex: req.query.city, $options: "i" };
      }

      // Filter of province
      if (req?.query?.province) {
        query.province = { $regex: req.query.province, $options: "i" };
      }

      // Filter of homeCity
      if (req?.query?.homeCity) {
        query.homeCity = { $regex: req.query.homeCity, $options: "i" };
      }

      // Filter of homeState
      if (req?.query?.homeState) {
        query.homeState = { $regex: req.query.homeState, $options: "i" };
      }

      // Filter of homeCountry
      if (req?.query?.homeCountry) {
        query.homeCountry = { $regex: req.query.homeCountry, $options: "i" };
      }

      // Filter of personalRoom
      if (req?.query?.personalRoom !== undefined) {
        query.personalRoom = req.query.personalRoom === 'true' || req.query.personalRoom === true;
      }

      // Filter of laundry
      if (req?.query?.laundry !== undefined) {
        query.laundry = req.query.laundry === 'true' || req.query.laundry === true;
      }

      // Filter of totalPerson
      if (req?.query?.totalPerson) {
        query.totalPerson = { $gte: Number(req.query.totalPerson) };
      }

      // Filter of user ID
      if (req?.query?.userId) {
        query.userId = req.query.userId;
      }

      // Filter of ID
      if (req?.query?._id) {
        query._id = req.query._id;
      }

      const tenants = await DB.TENANT.find(query).sort({ createdAt: -1 });
      
      return response.OK({
        res,
        message: MESSAGE.SUCCESS,
        payload: Array.isArray(tenants) ? tenants : [tenants].filter(Boolean),
      });
    } catch (e) {
      return response.CATCH_EXCEPTION_ERROR({
        res,
        message: e.message || MESSAGE.INTERNAL_SERVER_ERROR,
        payload: {},
      });
    }
  },

  updateTenant: async (req, res) => {
    try {
      const tenantExists = await DB.TENANT.findOneAndUpdate(
        { _id: req.query._id, isDeleted: { $ne: true } },
        { $set: req.body },
        { new: true, runValidators: true }
      );
      
      if (!tenantExists) {
        return response.NOT_FOUND({
          res,
          message: MESSAGE.NOT_FOUND,
          payload: {},
        });
      }

      // Regenerate sharing message
      const { generateTenantMessage } = require('../../helpers/common.helper');
      const message = generateTenantMessage(tenantExists);
      await DB.TENANT.findOneAndUpdate(
        { _id: req.query._id },
        { $set: { sharingMessage: message } },
      );

      return response.OK({
        res,
        message: MESSAGE.SUCCESS,
        payload: tenantExists,
      });
    } catch (error) {
      return response.CATCH_EXCEPTION_ERROR({
        res,
        message: error.message || MESSAGE.INTERNAL_SERVER_ERROR,
        payload: {},
      });
    }
  },

  deleteTenant: async (req, res) => {
    try {
      const tenantExists = await DB.TENANT.findOneAndUpdate(
        { _id: req.query._id },
        { $set: { isActive: false, isDeleted: true } },
        { new: true }
      );
      
      if (!tenantExists) {
        return response.NOT_FOUND({
          res,
          message: MESSAGE.NOT_FOUND,
          payload: {},
        });
      }

      return response.OK({
        res,
        message: MESSAGE.SUCCESS,
        payload: tenantExists,
      });
    } catch (error) {
      return response.CATCH_EXCEPTION_ERROR({
        res,
        message: error.message || MESSAGE.INTERNAL_SERVER_ERROR,
        payload: {},
      });
    }
  },
};

module.exports = { helpers, controllers };
