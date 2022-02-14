const Joi = require("joi");

const createValidation = Joi.object({
  name: Joi.string().required().min(5).trim(),
  project_id: Joi.string().required().min(8).trim()
});

const updateValidation = Joi.object({
  name: Joi.string().min(5).trim(),
  project_id: Joi.string().min(8).trim(),
});

module.exports = {
  createValidation,
  updateValidation
};
