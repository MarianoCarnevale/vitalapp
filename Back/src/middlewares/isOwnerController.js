import { generateError } from '../utils/errors/generateError.js';

export const isOwnerController = async (req, res, next) => {
  try {
    // Obtener el id de la respuesta.
    const { response_id } = req.params;
    const user_id = req.user.id;

    // Comprobar si el usuario coincide con el user_id de la respuesta.
    // const isOwner = await isOwnerModel(user_id, response_id);

    // // Si no se encuentra la respuesta, lanzar un error.
    // if (!isOwner) {
    //   throw generateError(
    //     'Usuario no autorizado para recibir la respuesta',
    //     401
    //   );
    // }

    // Pasar el control al siguiente middleware.
    next();
  } catch (error) {
    next(error);
  }
};
