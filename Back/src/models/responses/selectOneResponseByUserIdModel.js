import { getPool } from '../../db/getPool.js';

export const selectOneResponseByUserIdModel = async (
  user_id,
  consultation_id,
  response_id
) => {
  try {
    console.log(user_id);
    // Crear la conexión a la base de datos.
    const pool = await getPool();
    // Obtener la respuesta.
    const response = await pool.query(
      `SELECT R.response_id, U.user_id, U.first_name, U.role, R.consultation_id, R.content, R.created_at
        FROM responses R
        INNER JOIN users U ON R.user_id = U.user_id
        WHERE R.consultation_id = ? AND U.user_id = ? AND R.response_id = ?
      GROUP BY U.user_id, R.response_id, consultation_id, R.created_at
      ORDER BY R.created_at ASC
      `,
      [consultation_id, user_id, response_id]
    );

    // Devolver la respuesta.
    return response[0];
  } catch (error) {
    throw error;
  }
};
