import { selectResponseByIdModel } from '../models/tweets/index.js';
import { notFoundError } from '../services/errorService.js';

export const responseExistsController = async (req, res, next) => {
  try {
    // Obtener el id de la respuesta.
    const { response_id } = req.params;

    // Comprobar si existe una respuesta con el id proporcionado.
    const response = await selectResponseByIdModel(response_id);

    // Si no se encuentra la respuesta, lanzar un error.
    if (!response) {
      notFoundError('respuesta');
    }

    // Pasar el control al siguiente middleware.
    next();
  } catch (error) {
    next(error);
  }
};
