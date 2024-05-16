// Importamos la conexión a la base de datos.
import { getPool } from '../../db/getPool.js';
import { generateError } from '../../utils/errors/generateError.js';

// Función que realiza una consulta a la base de datos para crear un nuevo usuario.
export const reactivateUserByEmailModel = async (email) => {
  // Crear un pool de conexiones.
  const pool = await getPool();

  // Insertamos el usuario en la base de datos.
  const [result] = await pool.query(
    `UPDATE users SET is_active = 1 WHERE email = ?`,
    [email]
  );

  // Verificar si el insert afectó a alguna línea.
  if (result.affectedRows === 0) {
    throw generateError('No se ha podido reactivar al usuario', 500);
  }
};
