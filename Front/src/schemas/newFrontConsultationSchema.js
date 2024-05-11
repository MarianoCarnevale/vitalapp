import joi from 'joi';
import { joiErrorMessages } from '../../../Back/src/schemas/joiErrorMessages.js';

export const newFrontConsultationsSchema = joi.object({
  doctor: joi.allow().messages(joiErrorMessages),
  titulo: joi.string().min(3).max(20).required().messages(joiErrorMessages),
  descripcion: joi.string().min(3).max(100).required().messages(joiErrorMessages),
  especialidad: joi.required().messages(joiErrorMessages),
  gravedad: joi.string().required().messages(joiErrorMessages),
  file: joi.allow().messages(joiErrorMessages),
})