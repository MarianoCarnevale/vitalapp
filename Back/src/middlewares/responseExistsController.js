import { selectAllResponsesByConsultationModel } from '../models/responses/index.js';
import { generateError } from '../utils/errors/generateError.js';

export const responseExistsController = async (req, res, next) => {
  try {
    // Obtener el id de la respuesta.
    const { response_id } = req.params;

    // Comprobar si existe una respuesta con el id proporcionado.
    const response = await selectAllResponsesByConsultationModel(response_id);

    // Si no se encuentra la respuesta, lanzar un error.
    if (!response) {
      throw generateError('No se ha encontrado la respuesta', 404)
    }

    // Pasar el control al siguiente middleware.
    next();
  } catch (error) {
    next(error);
  }
};
