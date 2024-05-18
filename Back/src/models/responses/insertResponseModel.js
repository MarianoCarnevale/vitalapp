import { getPool } from '../../db/getPool.js';
import { generateError } from '../../utils/errors/generateError.js';

export const insertResponseModel = async (
  response_id,
  consultation_id,
  user_id,
  content,
  role
) => {

  try {
    // Crear el pool de conexiones.
    const pool = await getPool();

    // Crear la query base.
    let query = `INSERT INTO responses (response_id, consultation_id, user_id, content) VALUES (?, ?, ?, ?)`;

    // Crear los valores para la query.
    let values = [response_id, consultation_id, user_id, content];

    // Insertamos la respuesta en la base de datos.
    const [result] = await pool.query(query, values);

    // Verificar si el insert afectó a alguna línea.
    if (result.affectedRows === 0) {
      throw generateError('No se ha podido insertar la respuesta.', 500);
    }

    // Buscar la respuesta insertada.
    const [response] = await pool.query(
      `SELECT * FROM responses WHERE response_id = ?`,
      [response_id]
    );

    // si la respuesta es de un doctor la consulta pasa a ser is_pending : 0

    if (role === 'doctor') {
      await pool.query(
        `UPDATE consultations SET is_pending = 0 WHERE consultation_id = ?`,
        [consultation_id]
      );
    }

    // Devolver la respuesta.
    return response[0];
  } catch (error) {
    console.log('Error al insertar la respuesta', error);
    throw error;
  }
};
