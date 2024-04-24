import { deleteResponseModel, selectAllResponsesByConsultationModel } from '../../models/responses/index.js';
import { notAuthorizedError } from '../errorService.js';

export const deleteResponseService = async (user_id, consultation_id, response_id ) => {
  try {
    console.log(response_id);
    // Recuperar la respuesta de la base de datos.
    const response = await selectAllResponsesByConsultationModel(consultation_id);
    // Comprobar si el user_id es el mismo que el de la respuesta.
    if (response[0].user_id !== user_id) {
      notAuthorizedError();
    }

    // Eliminar la respuesta de la base de datos.
    await deleteResponseModel(response_id);

    return;
  } catch (error) {
    console.log('Error al eliminar la respuesta', error);
    throw error;
  }
};
