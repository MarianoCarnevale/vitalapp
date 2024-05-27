import { getPool } from '../../db/getPool.js';

export const selectResponseByIdModel = async (response_id) => {
  try {
    // Crear la conexión a la base de datos.
    const pool = await getPool();

    // Obtener el tweet.
    const response = await pool.query(`SELECT * FROM responses WHERE response_id = ?`, [
      response_id,
    ]);

    // Devolver la respuesta.
    return response[0];
  } catch (error) {
    throw error;
  }
};
