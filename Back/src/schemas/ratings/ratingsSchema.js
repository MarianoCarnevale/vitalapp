import joi from 'joi';
import { joiErrorMessages } from '../joiErrorMessages.js';

export const ratingSchema = joi.object({
  rating_value: joi
    .number()
    .min(1)
    .max(5)
    .required()
    .messages(joiErrorMessages),
});
