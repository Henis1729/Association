const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");
const {
  ENUM: { ROLE },
} = require("../helpers/constant.helper");

const {
  TENANT: { VALIDATOR, APIS },
} = require("../controllers");

router.post(
  "/",
  auth({ usersAllowed: ['user', "admin"] }),
  VALIDATOR.createTenant,
  APIS.createTenant
);

router.get(
  "/",
  auth({ usersAllowed: ['*'] }),
  VALIDATOR.getTenant,
  APIS.getTenant
);

router.put(
  "/",
  auth({ usersAllowed: ['user', "admin"] }),
  VALIDATOR.updateTenant,
  APIS.updateTenant
);

router.delete(
  "/",
  auth({ usersAllowed: ['user', "admin"] }),
  VALIDATOR.deleteTenant,
  APIS.deleteTenant
);

module.exports = router;
