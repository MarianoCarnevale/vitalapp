// Importar joi
import joi from 'joi';
import { joiErrorMessages } from '../joiErrorMessages.js';

export const newUserSchema = joi.object({
  username: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  email: joi.string().email().required().messages(joiErrorMessages),
  password: joi
    .string()
    .min(4)
    .pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9@¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
    )
    .required()
    .messages(joiErrorMessages),
  role: joi
    .string()
    .valid('doctor', 'patient')
    .required()
    .messages(joiErrorMessages),
  first_name: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  first_surname: joi.string().min(3).max(30).messages(joiErrorMessages),
  doctor_registration_number: joi
    .string()
    .min(0)
    .max(15)
    .messages(joiErrorMessages),
  discipline_name: joi.string().min(0).max(30).messages(joiErrorMessages),
  experience: joi.date(),
});
