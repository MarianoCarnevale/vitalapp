import { getPool } from '../../db/getPool.js';
import { generateError } from '../../utils/errors/generateError.js';

export const updateUserActivationModel = async (validation_code) => {
  const pool = await getPool();

  // Actualizar el usuario con ese código de registro.
  const [result] = await pool.query(
    `UPDATE users SET is_active = 1 WHERE validation_code = ?`,
    [validation_code]
  );

  // Si no se ha actualizado ningún usuario, lanzar un error. Si llegó aqui el usuario existe asi que el error no es que no lo encontro sino que no se pudo actualizar.
  if (result.affectedRows === 0) {
    throw generateError('No se ha podido activar el usuario', 500);
  }

  // Devolver el resultado.
  return result;
};
