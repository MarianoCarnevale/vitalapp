// Importar joi
// Importar joi y joidate y extender una encima de la otra en una constante
import joi from "joi";
import { joiErrorMessages } from "./joiErrorMessages.js";

export const updateDoctorSchema = joi.object({
  username: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages(joiErrorMessages),
  password: joi
    .string()
    .optional()
    .allow("")
    .min(4)
    .pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9@¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
    )
    .messages(joiErrorMessages),
  confirmarpassword: joi
    .any()
    .optional()
    .allow("")
    .valid(joi.ref("password"))
    .messages(joiErrorMessages),
  doctor_registration_number: joi
    .string()
    .required()
    .min(1)
    .max(15)
    .messages(joiErrorMessages),
  discipline_name: joi
    .string()
    .min(1)
    .max(30)
    .required()
    .messages(joiErrorMessages),
  experience: joi
    .string()
    .pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
    .required()
    .messages({
      ...joiErrorMessages,
      "string.pattern.base": 'El formato debe ser "YYYY-MM-DD"',
    }),
  first_name: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  first_surname: joi
    .string()
    .min(3)
    .max(30)
    .required()
    .messages(joiErrorMessages),
  last_name: joi
    .string()
    .optional()
    .allow("")
    .min(3)
    .max(30)
    .messages(joiErrorMessages),
  last_surname: joi
    .string()
    .optional()
    .allow("")
    .min(3)
    .max(30)
    .messages(joiErrorMessages),
  bio: joi
    .string()
    .optional()
    .allow("")
    .min(0)
    .max(255)
    .messages(joiErrorMessages),
  address: joi
    .string()
    .optional()
    .allow("")
    .min(0)
    .max(100)
    .messages(joiErrorMessages),
  phone_number: joi
    .string()
    .optional()
    .allow("")
    .min(0)
    .max(15)
    .messages(joiErrorMessages),
  birth_date: joi
    .string()
    .optional()
    .allow("")
    .pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
    .messages({
      ...joiErrorMessages,
      "string.pattern.base": 'El formato debe ser "YYYY-MM-DD"',
    }),
});
