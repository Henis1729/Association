const DB = require("../../models");
const { MESSAGE } = require("../../helpers/constant.helper");
const { response } = require("../../helpers");
const { wrapControllers } = require("../../helpers/controller.wrapper");

const helpers = {};

const controllers = {
  createOwner: async (req, res) => {
    try {
      //* create Owner listing
      const owner = await DB.OWNER.create(req.body);

      return response.OK({
        res,
        message: MESSAGE.SUCCESS,
        payload: owner,
      });
    } catch (error) {
      if (error.code === 11000) {
        return response.DUPLICATE_VALUE({
          res,
          message: MESSAGE.ALREADY_EXISTS,
          payload: {},
        });
      }
      return response.CATCH_EXCEPTION_ERROR({
        res,
        message: error.message || MESSAGE.INTERNAL_SERVER_ERROR,
        payload: {},
      });
    }
  },

  getOwner: async (req, res) => {
    try {
      let query = { isActive: true, isDeleted: { $ne: true } };

      // Filter by ID
      if (req.query._id) {
        query._id = req.query._id;
      }

      // Filter by city
      if (req.query.city) {
        query.city = { $regex: req.query.city, $options: "i" };
      }

      // Filter by province
      if (req.query.province) {
        query.province = { $regex: req.query.province, $options: "i" };
      }

      // Filter by gender
      if (req.query.gender && req.query.gender !== 'any') {
        query.gender = req.query.gender;
      }

      // Filter by dietary
      if (req.query.dietary && req.query.dietary !== 'any') {
        query.dietary = req.query.dietary;
      }

      // Filter by accommodation type
      if (req.query.accomodationType && req.query.accomodationType !== 'any') {
        query.accomodationType = req.query.accomodationType;
      }

      // Filter by rent (less than or equal)
      if (req.query.rent) {
        query.rent = { $lte: Number(req.query.rent) };
      }

      // Filter by available space
      if (req.query.availabelSpace) {
        query.availabelSpace = { $gte: Number(req.query.availabelSpace) };
      }

      // Filter by homeCity
      if (req.query.homeCity) {
        query.homeCity = { $regex: req.query.homeCity, $options: "i" };
      }

      // Filter by homeState
      if (req.query.homeState) {
        query.homeState = { $regex: req.query.homeState, $options: "i" };
      }

      const owners = await DB.OWNER.find(query).sort({ createdAt: -1 });

      return response.OK({
        res,
        message: MESSAGE.SUCCESS,
        payload: Array.isArray(owners) ? owners : [owners].filter(Boolean),
      });
    } catch (error) {
      return response.CATCH_EXCEPTION_ERROR({
        res,
        message: error.message || MESSAGE.INTERNAL_SERVER_ERROR,
        payload: {},
      });
    }
  },

  updateOwner: async (req, res) => {
    try {
      const owner = await DB.OWNER.findOneAndUpdate(
        { _id: req.query._id, isDeleted: { $ne: true } },
        { $set: req.body },
        { new: true, runValidators: true }
      );

      if (!owner) {
        return response.NOT_FOUND({
          res,
          message: MESSAGE.NOT_FOUND,
          payload: {},
        });
      }

      return response.OK({
        res,
        message: MESSAGE.SUCCESS,
        payload: owner,
      });
    } catch (error) {
      return response.CATCH_EXCEPTION_ERROR({
        res,
        message: error.message || MESSAGE.INTERNAL_SERVER_ERROR,
        payload: {},
      });
    }
  },

  deleteOwner: async (req, res) => {
    try {
      const owner = await DB.OWNER.findOneAndUpdate(
        { _id: req.query._id },
        { $set: { isActive: false, isDeleted: true } },
        { new: true }
      );

      if (!owner) {
        return response.NOT_FOUND({
          res,
          message: MESSAGE.NOT_FOUND,
          payload: {},
        });
      }

      return response.OK({
        res,
        message: MESSAGE.SUCCESS,
        payload: owner,
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

// Wrap all controllers with error handling
const wrappedControllers = wrapControllers(controllers, 'Owner');

module.exports = { helpers, controllers: wrappedControllers };
