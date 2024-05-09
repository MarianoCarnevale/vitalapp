import joi from "joi";
import { joiErrorMessages } from "./joiErrorMessages";

export const recoverPasswordSchema = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages(joiErrorMessages),
});
