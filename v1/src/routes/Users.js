const express = require("express");
const { create, index, login, projectList } = require("../controllers/Users");
const router = express.Router();
const validate = require("../middleware/validate");
const schemas = require("../validations/Users");
const authenticate = require("../middleware/authenticate");

router.get("/", index);

router.route("/").post(validate(schemas.createValidation), create);
router.route("/login").post(validate(schemas.loginValidation), login);
router.route("/projects").get(authenticate, projectList);

module.exports = router;
