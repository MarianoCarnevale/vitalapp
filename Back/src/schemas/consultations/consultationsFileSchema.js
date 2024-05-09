import joi from 'joi';

import { imgSchema } from '../imgSchema.js';

export const consultationsFileSchema = joi.object({
  image: imgSchema.required(),
});
