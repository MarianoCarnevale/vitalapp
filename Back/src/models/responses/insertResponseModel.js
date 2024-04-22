import { getPool } from '../../db/getPool.js';

export const insertResponseModel = async (response_id, consultation_id, user_id, content) => {
  try {
    // Crear el pool de conexiones.
    const pool = await getPool();

    // Crear la query base.
    let query = `INSERT INTO responses (response_id, consultation_id, user_id, content) VALUES (?, ?, ?)`;

    // Crear los valores para la query.
    let values = [response_id, consultation_id, user_id, content];

    // Insertamos la respuesta en la base de datos.
    const [result] = await pool.query(query, values);

    // Verificar si el insert afectó a alguna línea.
    if (result.affectedRows === 0) {
      const error = new Error('No se ha podido insertar la respuesta.');
      error.code = 'INSERT_RESPONSE_ERROR';
      throw error;
    }

    // Buscar la respuesta insertada.
    const [response] = await pool.query(`SELECT * FROM responses WHERE response_id = ?`, [response_id]);

    // Devolver la respuesta.
    return response[0];
  } catch (error) {
    console.log('Error al insertar la respuesta', error);
    throw error;
  }
};
