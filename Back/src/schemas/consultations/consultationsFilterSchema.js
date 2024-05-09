// Importar joi
import joi from 'joi';
import { joiErrorMessagesConsultations } from './joiErrorMessagesConsultations.js';

export const newConsultationsSchema = joi.object({
  user_id: joi.number().required(),
  doctor_id: joi.number().required(),
  title: joi.string().min(3).max(30).required().messages(joiErrorMessagesConsultations),
  description: joi.string().min(4).required().messages(joiErrorMessagesConsultations),
  file: joi.string().min(4).messages
  (joiErrorMessagesConsultations),
  discipline_id: joi.number().required(),
  severity: joi.string().valid('high', 'medium','low').required().messages(joiErrorMessagesConsultations),
});
