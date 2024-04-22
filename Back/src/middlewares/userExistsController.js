import { selectUserByIdModel } from '../models/users/index.js';
import { notFoundError } from '../services/errorService.js';

export const userExistsController = async (req, res, next) => {
  try {
    // Obtener el id del usuario. Ya sea desde el token o desde los parámetros de la URL.
    const user_id = req.user?.user_id || req.params.user_id;

    // Comprobar si existe un usuario con el id proporcionado.
    const user = await selectUserByIdModel(user_id);

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
