import { getPool } from '../../db/getPool.js';

export const getOneDisciplineByUserModel = async (user_id) => {
  try {
    // Crear la conexión a la base de datos.
    const pool = await getPool();

    // Obtener la disciplina.
    const [discipline_id] = await pool.query(
      `
      SELECT DS.discipline_id
      FROM users U
      INNER JOIN doctors D ON D.user_id = U.user_id
      INNER JOIN doctors_disciplines DDS ON DDS.doctor_id = D.doctor_id
      INNER JOIN disciplines DS ON DS.discipline_id = DDS.discipline_id
      WHERE U.user_id = ?
      `, [user_id]
    );
    return discipline_id[0].discipline_id;
  } catch (error) {
    throw error;
  }
};
