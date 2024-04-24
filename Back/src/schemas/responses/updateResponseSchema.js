import joi from 'joi';
import { joiErrorMessages } from '../joiErrorMessages.js';

export const updateResponseSchema = joi.object({
  content: joi.string().min(1).required().messages(joiErrorMessages),
});
