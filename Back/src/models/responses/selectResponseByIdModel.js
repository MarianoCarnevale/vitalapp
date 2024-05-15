import { getPool } from '../../db/getPool.js';
import { generateError } from '../../utils/errors/generateError.js';

export const selectResponseByIdModel = async (response_id) => {
  try {
    // Crear la conexión a la base de datos.
    const pool = await getPool();

    // Obtener la respuesta.
    const response = await pool.query(`SELECT * FROM responses WHERE response_id = ?`, [
      response_id,
    ]);

    if (!response) {
      throw generateError('Error al recibir la respuesta, la respuesta no existe', 500)
    }

    // Devolver la respuesta.
    return response[0];
  } catch (error) {
    console.log('Error al obtener la respuesta por id', error);
    throw error;
  }
};
