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
  VALIDATOR.createTenant,
  APIS.createTenant
);

router.get(
  "/",
  VALIDATOR.getTenant,
  APIS.getTenant
);

router.put(
  "/",
  VALIDATOR.updateTenant,
  APIS.updateTenant
);

router.delete(
  "/",
  VALIDATOR.deleteTenant,
  APIS.deleteTenant
);

module.exports = router;
