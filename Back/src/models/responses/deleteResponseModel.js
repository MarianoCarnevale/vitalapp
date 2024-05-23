import { getPool } from '../../db/getPool.js';
import { generateError } from '../../utils/errors/generateError.js';

export const deleteResponseModel = async (response_id) => {
  try {
    // Crear la conexión a la base de datos.
    const pool = await getPool();

    // Eliminar la respuesta de la base de datos.
    const [result] = await pool.query(`DELETE FROM responses WHERE response_id = ?`, [
      response_id,
    ]);

    // Verificar si el delete afectó a alguna línea.
    if (result.affectedRows === 0) {
      throw generateError('No se ha podido eliminar la respuesta', 500)
    }

    return;
  } catch (error) {
    throw error;
  }
};
