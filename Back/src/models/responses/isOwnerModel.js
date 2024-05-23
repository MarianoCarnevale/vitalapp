import { getPool } from '../../db/getPool.js';

export const isOwnerModel = async (user_id, response_id) => {
  try {
    // Crear la conexión a la base de datos.
    const pool = await getPool();

    // Obtener la respuesta en la que el usuario coincida.
    const isOwner = await pool.query(`SELECT * FROM responses WHERE response_id = ? AND user_id = ?`, [
      response_id, user_id
    ]);

    // Devolver la consulta.
    return isOwner[0];
  } catch (error) {
    throw error;
  }
};
