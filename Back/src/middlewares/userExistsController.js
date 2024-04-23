import { selectUserByIdModel } from '../models/users/index.js';
import { generateError } from '../utils/errors/generateError.js';

export const userExistsController = async (req, res, next) => {
  try {
    // Obtener el id del usuario. Ya sea desde el token o desde los parámetros de la URL.
    const userId = req.user?.id || req.params.user_id;

    // Comprobar si existe un usuario con el id proporcionado.
    const user = await selectUserByIdModel(userId);

    // Si no se encuentra el usuario, lanzar un error.
    if (!user) {
      throw generateError('El usuario no existe', 404);
    }

    // Pasar el control al siguiente middleware.
    next();
  } catch (error) {
    next(error);
  }
};
