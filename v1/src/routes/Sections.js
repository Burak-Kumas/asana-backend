const express = require("express");
const Section = require("../controllers/Sections");
const authenticate = require("../middleware/authenticate");
const validate = require("../middleware/validate");
const schemas = require("../validations/Sections");
const router = express.Router();

router.route("/:project_id").get(authenticate, Section.index);
router.route("/").post(authenticate, validate(schemas.createValidation), Section.create);
router.route("/:id").patch(authenticate, validate(schemas.updateValidation), Section.update);
router.route("/:id").delete(authenticate, Section.deleteSection);

module.exports = router;
