import joi from 'joi';

export const consultationsFileSchema = joi.object({
  name: joi.allow(),
  data: joi.allow(),
  size: joi.allow(),
  encoding: joi.allow(),
  tempFilePath: joi.allow(),
  truncated: joi.allow(),
  mimetype: joi.valid('image/jpeg','image/png').required().messages({'any.only' : 'La imagend debe ser png o jpg'}),
  md5: joi.allow(),
  mv: joi.allow()
})
