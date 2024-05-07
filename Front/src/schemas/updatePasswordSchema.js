import joi from "joi";
import { joiErrorMessages } from "./joiErrorMessages";

export const updatePasswordSchema = joi.object({
  password: joi
    .string()
    .min(4)
    .pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9@¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
    )
    .required()
    .messages(joiErrorMessages),
  confirmarpassword: joi
    .any()
    .valid(joi.ref("password"))
    .required()
    .messages(joiErrorMessages),
});
