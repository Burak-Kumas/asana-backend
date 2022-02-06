const express = require("express");
const { create, index } = require("../controllers/Projects");
const router = express.Router();
const validate = require("../middleware/validate");
const schemas = require("../validations/Projects");

router.get("/", index);

router.route("/").post(validate(schemas.createValidation), create);

module.exports = router;
