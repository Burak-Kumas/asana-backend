const Joi = require("joi");

const createValidation = Joi.object({
  title: Joi.string().required().min(3).trim(),
  section_id: Joi.string().required().min(8).trim(),
  project_id: Joi.string().required().min(8).trim(),
  description: Joi.string().min(8).trim(),
  assigned_to: Joi.string().min(8),
  due_date: Joi.date().min(8),
  statuses: Joi.array(),
  order: Joi.number(),
  isCompleted: Joi.boolean(),
  commets: Joi.array(),
  media: Joi.array(),
  sub_tasks: Joi.array(),
});

const updateValidation = Joi.object({
  title: Joi.string().min(3).trim(),
  section_id: Joi.string().min(8).trim(),
  project_id: Joi.string().min(8).trim(),
  description: Joi.string().min(8).trim(),
  assigned_to: Joi.string().min(8),
  due_date: Joi.date().min(8),
  statuses: Joi.array(),
  order: Joi.number(),
  isCompleted: Joi.boolean(),
  commets: Joi.array(),
  media: Joi.array(),
  sub_tasks: Joi.array(),
});
const commentValidation = Joi.object({
  comment: Joi.string().min(3).trim(),
});

module.exports = {
  createValidation,
  updateValidation,
  commentValidation,
};
