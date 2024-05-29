// Importar joi y joidate y extender una encima de la otra en una constante
import BaseJoi from 'joi';
import JoiDate from '@joi/date';
const joi = BaseJoi.extend(JoiDate);

import { joiErrorMessages } from '../joiErrorMessages.js';

export const updateUserSchema = joi.object({
  email: joi.string().email().required().messages(joiErrorMessages),
  username: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  password: joi
    .string()
    .min(4)
    .pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9@¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
    )
    .required()
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
  adress: joi.string().min(0).max(100).messages(joiErrorMessages),
  phone_number: joi.string().min(0).max(15).messages(joiErrorMessages),
  birth_date: joi.date().format('YYYY-MM-DD'),
});
