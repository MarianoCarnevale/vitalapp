import joi from 'joi';
import { joiErrorMessages } from '../joiErrorMessages.js';

export const updateDoctorSchema = joi.object({
  email: joi.string().email().required().messages(joiErrorMessages),
  username: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  password: joi
    .string()
    .min(4)
    .pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9@¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
    )
    .messages(joiErrorMessages),
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
  address: joi.string().min(0).max(100).messages(joiErrorMessages),
  phone_number: joi.string().min(0).max(15).messages(joiErrorMessages),
  birth_date: joi.date(),
  doctor_registration_number: joi
    .string()
    .min(0)
    .max(15)
    .messages(joiErrorMessages),
  discipline_name: joi.string().min(0).max(30).messages(joiErrorMessages),
  experience: joi.date(),
});
