// Importamos la conexión a la base de datos.
import { getPool } from '../../db/getPool.js';
import { generateError } from '../../utils/errors/generateError.js';

// Función que realiza una consulta a la base de datos para crear un nuevo usuario.
export const updateUserPassModel = async (password, email) => {
  try {
    // Crear un pool de conexiones.
    const pool = await getPool();

    // Insertamos el usuario en la base de datos.
    const [result] = await pool.query(
      `UPDATE users SET password = ? WHERE email = ?`,
      [password, email]
    );
    console.log(result);
  } catch (error) {
    throw generateError('Ha ocurrido un error al cambiar la contraseña', 404);
  }
};
