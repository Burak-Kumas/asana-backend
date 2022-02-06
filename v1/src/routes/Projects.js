const express = require("express");
const { create, index } = require("../controllers/Projects");
const authenticate = require("../middleware/authenticate");
const router = express.Router();
const validate = require("../middleware/validate");
const schemas = require("../validations/Projects");

router.route("/").get(authenticate, index);
router.route("/").post(authenticate, validate(schemas.createValidation), create);

module.exports = router;
