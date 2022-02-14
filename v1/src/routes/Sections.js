const express = require("express");
const { index, create, update, deleteSection} = require("../controllers/Sections");
const authenticate = require("../middleware/authenticate");
const validate = require("../middleware/validate");
const schemas = require("../validations/Sections");
const router = express.Router();

router.route("/:project_id").get(authenticate, index);
router.route("/").post(authenticate, validate(schemas.createValidation), create);
router.route("/:id").patch(authenticate, validate(schemas.updateValidation), update);
router.route("/:id").delete(authenticate, deleteSection);

module.exports = router;
