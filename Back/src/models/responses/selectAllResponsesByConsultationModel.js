import { getPool } from '../../db/getPool.js';

export const selectAllResponsesByConsultationModel = async (consultation_id) => {
  try {
    // Crear la conexión a la base de datos.
    const pool = await getPool();

    // Obtener la respuesta.
    const [response] = await pool.query(
      `SELECT U.user_id, U.first_name, U.role, R.content, AVG(RT.rating_value) AS rating FROM responses R
        INNER JOIN users U ON R.user_id = U.user_id
        INNER JOIN ratings RT ON RT.response_id = R.response_id
        WHERE consultation_id = ?
      `,
      [consultation_id]
    );

    // Devolver la respuesta.
    return response[0];
  } catch (error) {
    console.log('Error al obtener la respuesta por id', error);
    throw error;
  }
};


