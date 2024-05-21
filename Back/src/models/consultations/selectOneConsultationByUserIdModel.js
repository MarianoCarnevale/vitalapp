import { getPool } from '../../db/getPool.js';
import { generateError } from '../../utils/errors/generateError.js';

export const selectOneConsultationByUserIdModel = async (array_filter) => {
  try {
    //Esperamos conexion de la base de datos
    const pool = await getPool();

    const [consultations] = await pool.query(
      `
      SELECT 
      C.consultation_id AS consultation_id, C.user_id AS user_id
    FROM 
      consultations C
    JOIN 
      users U ON C.user_id = U.user_id
${array_filter}
            `,
      [array_filter]
    );

    return [consultations];
  } catch (error) {
    throw generateError('consulta no encontrada', 404);
  }
};
