import { insertResponseModel } from '../../models/responses/index.js';

export const insertResponseService = async (
  consultation_id,
  user_id,
  content,
  role
) => {
  try {
    // Creamos una id para la respuesta.
    const response_id = crypto.randomUUID();
    console.log(response_id);
    // Insertamos la respuesta en la base de datos.
    const response = await insertResponseModel(
      response_id,
      consultation_id,
      user_id,
      content,
      role
    );

    return response;
  } catch (error) {
    throw error;
  }
};
