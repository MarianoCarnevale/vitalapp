import { selectResponseByIdModel, updateResponseModel } from '../../models/responses/index.js';
import { generateError } from '../../utils/errors/generateError.js';

export const updateResponseService = async (user_id, response_id, content) => {
  try {
    // Recuperar la de la base de datos.
    const  oldResponse = await selectResponseByIdModel(response_id);
    
    // Comprobar si el user_id es el mismo que el de la respuesta.
    if (oldResponse[0].user_id !== user_id) {
      throw generateError('Usuario no autorizado para modificar la respuesta', 401)
    };

    // Actualizar la respuesta en la base de datos.
    const response = await updateResponseModel(response_id, content);
    
    return response;
  } catch (error) {
    throw error;
  }
};

