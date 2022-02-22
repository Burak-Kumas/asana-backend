const express = require("express");
const Task = require("../controllers/Tasks");
const authenticate = require("../middleware/authenticate");
const validate = require("../middleware/validate");
const schemas = require("../validations/Tasks");
const router = express.Router();

router.route("/").post(authenticate, validate(schemas.createValidation), Task.create);
router.route("/:id").patch(authenticate, validate(schemas.updateValidation), Task.update);
router.route("/:id/make-comment").post(authenticate, validate(schemas.commentValidation), Task.makeComment);
router.route("/:id/:commentId").delete(authenticate, validate(schemas.commentValidation), Task.deleteComment);
router.route("/:id/add-sub-task").post(authenticate, validate(schemas.createValidation), Task.addSubTask);
router.route("/:id/show-task").get(authenticate, Task.showTask);
router.route("/:id").delete(authenticate, Task.deleteTask);

module.exports = router;
