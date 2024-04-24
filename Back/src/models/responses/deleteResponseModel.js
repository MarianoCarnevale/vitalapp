import { getPool } from '../../db/getPool.js';

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
      const error = new Error('No se ha podido eliminar la respuesta.');
      error.code = 'DELETE_TWEET_ERROR';
      throw error;
    }

    return;
  } catch (error) {
    console.log('Error al eliminar la respuesta', error);
    throw error;
  }
};
