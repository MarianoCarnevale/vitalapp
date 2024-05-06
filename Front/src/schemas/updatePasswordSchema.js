import joi from "joi";
import { joiErrorMessages } from "./joiErrorMessages";

export const updatePasswordSchema = joi.object({
  password: joi
    .string()
    .required()
    .min(4)
    .pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9@¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
    )
    .label("password")
    .messages(joiErrorMessages),
  confirmarpassword: joi
    .required()
    .valid(joi.ref("password"))
    .messages(joiErrorMessages),
});
