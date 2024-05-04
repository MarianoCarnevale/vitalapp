import joi from "joi";

export const recoverPasswordSchema = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages(joiErrorMessages),
});
