// Importar jwt
import jwt from 'jsonwebtoken';

// Importar el error personalizado.
import { generateError } from './errors/generateError.js';

// Importar la clave secreta.
import { SECRET } from '../../env.js';

export const validateTokenUtil = async (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    generateError('Ha habido un error con la verificación del token', 401);
  }
};
