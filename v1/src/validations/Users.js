const Joi = require("joi");

const createValidation = Joi.object({
  full_name: Joi.string().required().min(3).trim(),
  password: Joi.string().required().min(8).trim(),
  email: Joi.string().email().required().trim(),
});
const loginValidation = Joi.object({
  password: Joi.string().required().min(8).trim(),
  email: Joi.string().email().required().trim(),
});
const resetPasswordValidation = Joi.object({
  email: Joi.string().email().required().trim(),
});

module.exports = {
  createValidation,
  loginValidation,
  resetPasswordValidation,
};
