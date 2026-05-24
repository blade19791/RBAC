import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

export const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().max(255).min(7).required(),
  password: passwordComplexity().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().max(255).min(7).required(),
  password: Joi.string().required(),
});
