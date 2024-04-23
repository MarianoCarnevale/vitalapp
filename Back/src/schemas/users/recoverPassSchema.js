// Import joi
import joi from 'joi';

// Import joiErrorMessages
import { joiErrorMessages } from '../joiErrorMessages.js';

export const recoverPassSchema = joi.object({
  email: joi.string().email().max(100).required().messages(joiErrorMessages),
});
