const express = require("express");
const { create, update, deleteTask, makeComment, deleteComment ,addSubTask } = require("../controllers/Tasks");
const authenticate = require("../middleware/authenticate");
const validate = require("../middleware/validate");
const schemas = require("../validations/Tasks");
const router = express.Router();

router.route("/").post(authenticate, validate(schemas.createValidation), create);
router.route("/:id").patch(authenticate, validate(schemas.updateValidation), update);
router.route("/:id/make-comment").post(authenticate, validate(schemas.commentValidation), makeComment);
router.route("/:id/:commentId").delete(authenticate, validate(schemas.commentValidation), deleteComment);
router.route("/:id/add-sub-task").post(authenticate, validate(schemas.createValidation), addSubTask);
router.route("/:id").delete(authenticate, deleteTask);

module.exports = router;
