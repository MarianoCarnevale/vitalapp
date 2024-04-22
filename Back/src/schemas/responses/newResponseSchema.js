import joi from 'joi';
import { joiErrorMessages } from '../joiErrorMessages.js';

export const newResponseSchema = joi.object({
  content: joi.string().min(1).required().messages(joiErrorMessages),
});
