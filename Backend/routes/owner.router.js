const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");
const {
  ENUM: { ROLE },
} = require("../helpers/constant.helper");

const {
    OWNER: { VALIDATOR, APIS },
} = require("../controllers");

router.post(
  "/",
  VALIDATOR.createOwner,
  APIS.createOwner
);

router.get(
  "/",
  VALIDATOR.getOwner,
  APIS.getOwner
);

router.put(
  "/",
  VALIDATOR.updateOwner,
  APIS.updateOwner
);

router.delete(
  "/",
  VALIDATOR.deleteOwner,
  APIS.deleteOwner
);

module.exports = router;
