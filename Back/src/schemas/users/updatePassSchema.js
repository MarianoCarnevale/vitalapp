// Import joi
import joi from 'joi';

// Import joiErrorMessages
import { joiErrorMessages } from '../joiErrorMessages.js';

export const updatePassSchema = joi.object({
  password: joi
    .string()
    .min(4)
    .pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9@¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
    )
    .required()
    .messages(joiErrorMessages),
});
