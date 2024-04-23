import { getPool } from '../../db/getPool.js';

import { generateError } from '../../utils/errors/generateError.js';

export const selectUserByRecoveryCodeModel = async (recovery_code) => {
  const pool = await getPool();
  try {
    // Obtener el usuario con ese email.
    const [user] = await pool.query(
      `SELECT * FROM users WHERE recovery_code = ?`,
      [recovery_code]
    );

    // Devolver el resultado.
    return user[0];
  } catch (error) {
    throw generateError(
      'Ha ocurrido un error al seleccionar al usuario por recovery_code',
      404
    );
  }
};
