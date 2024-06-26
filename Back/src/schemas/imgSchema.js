// Importar el módulo joi.
import joi from 'joi';

// Importar el módulo joiErrorMessages.
import { joiErrorMessages } from './joiErrorMessages.js';

// Esquema para validar imágenes.

export const imgSchema = joi
  .object({
    name: joi.string().required().messages(joiErrorMessages),
    mimetype: joi
      .string()
      .valid('image/jpeg', 'image/png')
      .required()
      .messages(joiErrorMessages),
    size: joi.number().max(5000000).required().messages(joiErrorMessages),
  })
  .unknown(true);
