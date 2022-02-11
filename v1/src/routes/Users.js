const express = require("express");
const { create, index, login, projectList, resetPassword, update } = require("../controllers/Users");
const router = express.Router();
const validate = require("../middleware/validate");
const schemas = require("../validations/Users");
const authenticate = require("../middleware/authenticate");

router.get("/", index);

router.route("/").post(validate(schemas.createValidation), create);
router.route("/").patch(authenticate,validate(schemas.updateValidation), update);
router.route("/login").post(validate(schemas.loginValidation), login);
router.route("/projects").get(authenticate, projectList);
router.route("/reset-password").post(validate(schemas.resetPasswordValidation), resetPassword);

module.exports = router;
