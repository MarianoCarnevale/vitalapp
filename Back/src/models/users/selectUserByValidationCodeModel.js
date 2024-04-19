import { getPool } from '../../db/getPool.js';
import { generateError } from '../../utils/errors/generateError.js';

export const selectUserByValidationCodeModel = async (validation_code) => {
  // Crear un pool de conexiones.
  const pool = await getPool();

  // Buscar el usuario en la base de datos.
  const [users] = await pool.query(
    `SELECT user_id, is_active FROM users WHERE validation_code = ?`,
    [validation_code]
  );

  // Si no se encuentra el usuario, lanzar un error.
  if (users.length === 0) {
    throw generateError(`No se ha encontrado el usuario`, 404);
  }

  // Si existe el usuario, comprobar si está activo.
  if (users[0].is_active) {
    throw generateError(`El usuario ya ha sido activado`, 400);
  }

  // Devolver el usuario.
  return users[0];
};
