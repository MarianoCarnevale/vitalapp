import joi from 'joi';
import { joiErrorMessages } from '../joiErrorMessages.js';

export const updatePatientSchema = joi.object({
  email: joi.string().email().required().messages(joiErrorMessages),
  username: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  first_name: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  last_name: joi.string().min(3).max(30).messages(joiErrorMessages),
  first_surname: joi
    .string()
    .min(3)
    .max(30)
    .required()
    .messages(joiErrorMessages),
  last_surname: joi.string().min(3).max(30).messages(joiErrorMessages),
  bio: joi.string().min(0).max(255).messages(joiErrorMessages),
  adress: joi.string().min(0).max(100).messages(joiErrorMessages),
  phone_number: joi.string().min(0).max(15).messages(joiErrorMessages),
  birth_date: joi.date(),
});
