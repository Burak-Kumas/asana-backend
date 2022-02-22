const express = require("express");
const User = require("../controllers/Users");
const router = express.Router();
const validate = require("../middleware/validate");
const schemas = require("../validations/Users");
const authenticate = require("../middleware/authenticate");

router.get("/", User.index);
router.route("/").post(validate(schemas.createValidation), User.create);
router.route("/").patch(authenticate, validate(schemas.updateValidation), User.update);
router.route("/login").post(validate(schemas.loginValidation), User.login);
router.route("/projects").get(authenticate, User.projectList);
router.route("/reset-password").post(validate(schemas.resetPasswordValidation), User.resetPassword);
router.route("/change-password").post(authenticate, validate(schemas.changePasswordValidation), User.changePassword);
router.route("/update-profile-image").post(authenticate, User.updateProfilImage);
router.route("/:id").delete(authenticate, User.deleteUser);

module.exports = router;
