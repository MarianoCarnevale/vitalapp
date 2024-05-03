import { getPool } from '../../db/getPool.js';

export const selectAllResponsesByConsultationModel = async (consultation_id) => {
  try {
    // Crear la conexión a la base de datos.
    const pool = await getPool();
    // Obtener la respuesta.
    const responses = await pool.query(
      `SELECT U.user_id, U.first_name, U.role, R.consultation_id, R.content, R.createdAt
        FROM responses R
        INNER JOIN users U ON R.user_id = U.user_id
        WHERE consultation_id = ?
      GROUP BY U.user_id, R.response_id, consultation_id, R.createdAt
      ORDER BY R.createdAt ASC
      `,
      [consultation_id]
    );

    console.log(responses);
    // Devolver la respuesta.
    return responses[0];
  } catch (error) {
    console.log('Error al obtener la respuesta por id', error);
    throw error;
  }
};


