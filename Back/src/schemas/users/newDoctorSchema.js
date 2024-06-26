// Importar joi y joidate y extender una encima de la otra en una constante
import BaseJoi from 'joi';
import JoiDate from '@joi/date';
const joi = BaseJoi.extend(JoiDate);
import { joiErrorMessages } from '../joiErrorMessages.js';

export const newDoctorSchema = joi.object({
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
  first_surname: joi
    .string()
    .min(3)
    .max(30)
    .required()
    .messages(joiErrorMessages),
  doctor_registration_number: joi
    .string()
    .min(1)
    .max(15)
    .required()
    .messages(joiErrorMessages),
  discipline_name: joi
    .string()
    .min(0)
    .max(30)
    .required()
    .messages(joiErrorMessages),
  experience: joi.date().format('YYYY-MM-DD').required(),
});
