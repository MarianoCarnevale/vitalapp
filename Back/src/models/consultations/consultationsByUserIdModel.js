import { getPool } from '../../db/getPool.js';
import { generateError } from '../../utils/errors/generateError.js';

export const consultationsByUserIdModel = async (select_info, array_filter) => {
  try {
    //Esperamos conexion de la base de datos
    const pool = await getPool();

    const query = `
    SELECT 
    C.consultation_id, C.is_pending, C.description, doctor.doctor_user_id, C.is_active,
    ${select_info}
    C.title, C.severity, C.created_at,
    DS.discipline_name AS discipline
  FROM consultations C
  INNER JOIN (
      SELECT D.user_id as doctor_user_id, D.doctor_id  as doctor_id, U.first_name AS doctor_first_name, U.first_surname AS doctor_first_surname
      FROM doctors D 
      INNER JOIN users U ON D.user_id = U.user_id
  ) AS doctor ON C.doctor_id = doctor.doctor_id
JOIN users U ON C.user_id = U.user_id
JOIN disciplines DS ON DS.discipline_id = C.discipline_id
${array_filter}
          ORDER BY severity`;

    const consultations = await pool.query(query);
    return consultations;
  } catch (error) {
    throw generateError('consulta no encontrada', 404);
  }
};
