import { notAuthenticatedError } from '../services/errorService.js';

import { validateTokenUtil } from '../utils/validateTokenUtil.js';

export const authUserController = async (req, res, next) => {
  try {
    
    const { authorization } = req.headers;

    // Si no se envía el token, lanzamos un error.
    if (!authorization) {
      notAuthenticatedError();
    }

    // Variable que almacena la info del token.
    const tokenInfo = await validateTokenUtil(authorization);

    // Añadimos la info del token a la request en la propiedad "user".
    req.user = tokenInfo;

    // Pasamos el control al siguiente middleware.
    next();
  } catch (error) {
    next(error);
  }
};
