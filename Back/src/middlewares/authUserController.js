// Importar los errores personalizados.
import { generateError } from '../utils/errors/generateError.js';

// Importar las utilidades.
import { validateTokenUtil } from '../utils/validateTokenUtil.js';

export const authUserController = async (req, res, next) => {
  try {
    // Guardamos el token en authorization.
    const { authorization } = req.headers;

    // Si no se envía el token, lanzamos un error.
    if (!authorization) {
      throw generateError('No se ha verificado la información del token', 401);
    }

    // Variable que almacena la info del token.
    const tokenInfo = await validateTokenUtil(authorization);

    if (!tokenInfo) {
      throw generateError('Hubo un error con la validación del token', 401);
    }
    // Añadimos la info del token a la request en la propiedad "user".
    req.user = tokenInfo;

    // Pasamos el control al siguiente middleware.
    next();
  } catch (error) {
    next(error);
  }
};
