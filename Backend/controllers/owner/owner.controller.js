const DB = require("../../models");
const { MESSAGE } = require("../../helpers/constant.helper");
const { response } = require("../../helpers");

const helpers = {};

const controllers = {
  createOwner: async (req, res) => {

    //* check if category already exists by name
    const categoryExists = await DB.Owner.findOne({ name: req.body.name });

    if (categoryExists)
      return response.DUPLICATE_VALUE({
        res,
        message: MESSAGE.ALREADY_EXISTS,
        payload: { name: req.body.name },
      });

    //* create Owner
    await DB.CATEGORY.create(req.body);

    return response.OK({
      res,
      message: MESSAGE.SUCCESS,
      payload: req.body,
    });
  },

  getOwner: async (req, res) => {
    //* check if category already exists by name
    let query = { isActive: true };

    if (req.query._id) {
      query = { _id: req.query._id };
    }
    if (req.query.name) {
      query = { $regex: req.query.name, $options: "i" };
    }
    const categoryExists = await DB.CATEGORY.find(query);
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

  updateOwner: async (req, res) => {
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

  deleteOwner: async (req, res) => {
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
