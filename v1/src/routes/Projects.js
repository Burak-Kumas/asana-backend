const express = require("express");
const Project = require("../controllers/Projects");
const authenticate = require("../middleware/authenticate");
const validate = require("../middleware/validate");
const schemas = require("../validations/Projects");
const router = express.Router();

router.route("/").get(authenticate, Project.index);
router.route("/").post(authenticate, validate(schemas.createValidation), Project.create);
router.route("/:id").patch(authenticate, validate(schemas.updateValidation), Project.update);
router.route("/:id").delete(authenticate, Project.deleteProject);

module.exports = router;
