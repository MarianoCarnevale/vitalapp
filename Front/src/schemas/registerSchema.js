// Importar joi
// Importar joi y joidate y extender una encima de la otra en una constante
import BaseJoi from "joi";
import JoiDate from "@joi/date";
const joi = BaseJoi.extend(JoiDate);
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
  role: joi
    .string()
    .valid("doctor", "patient")
    .required()
    .messages(joiErrorMessages),
  first_name: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  first_surname: joi
    .string()
    .min(3)
    .max(30)
    .required()
    .messages(joiErrorMessages),
  // doctor_registration_number: joi
  //   .string()
  //   .min(0)
  //   .max(15)
  //   .required()
  //   .messages(joiErrorMessages)
  //   .when("role", {
  //     is: "doctor",
  //     then: joi.required(),
  //   }),
  // discipline_name: joi.string().when("role", {
  //   is: "doctor",
  //   then: joi.any(),
  // }),
  // experience: joi.any().when("role", {
  //   is: "doctor",
  //   then: joi
  //     .date()
  //     .format("YYYY-MM-DD")
  //     .required()
  //     .messages({ "date.format": "La fecha debe tener el formato YYYY-MM-DD" }),
  // }),
});
