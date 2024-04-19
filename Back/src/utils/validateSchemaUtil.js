import { generateError } from './errors/generateError.js';

export const validateSchemaUtil = async (schema, body) => {
  try {
    // Validar el cuerpo con el esquema.
    await schema.validateAsync(body);
  } catch (error) {
    throw generateError(
      `El cuerpo de la petición no es válido: ${error.message}`,
      400
    );
  }
};
