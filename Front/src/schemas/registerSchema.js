// Importar joi
// Importar joi y joidate y extender una encima de la otra en una constante
import joi from "joi";
import { joiErrorMessages } from "./joiErrorMessages.js";

export const registerSchema = joi.object({
  username: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages(joiErrorMessages),
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
  role: joi.string().valid("doctor", "patient").required().messages({
    "string.empty": 'El campo "{#key}" no debe estar vacío',
    "any.only": 'El campo debe ser "doctor" o "paciente"',
  }),
  first_name: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  first_surname: joi
    .string()
    .min(3)
    .max(30)
    .required()
    .messages(joiErrorMessages),
});
