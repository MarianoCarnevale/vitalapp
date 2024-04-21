import { getPool } from "../../db/getPool.js"
import { generateError } from "../../utils/errors/generateError.js";

export const selectConsultationsPatient = async (user_id, user_type, data, way, filtro) => {
  try {
    //Esperamos conexion de la base de datos
    const pool = await getPool();
    

    await pool.query('USE vitalapp')

    const [consultations] = await pool.query(`
        SELECT 
      U.first_name, U.last_name, U.avatar, U.email, U.role,
      DS.name AS discipline,
      C.title, C.description, C.file, C.severity, C.created_at,
      COUNT (R.response_id) AS response_count
      FROM consultations C 
        INNER JOIN users U ON C.user_id = U.user_id
        INNER JOIN doctors_disciplines DD ON C.doctor_id = DD.doctor_id
        INNER JOIN disciplines DS ON DD.discipline_id = DS.discipline_id
        INNER JOIN responses R ON C.consultation_id = R.consultation_id
      WHERE 
        ${filtro}
      GROUP BY
        U.user_id, C.consultation_id, DS.discipline_id
      ORDER BY
        ${data} ${way},
        `);

    //retorno de los datos
    return consultations;
    
  } catch (error) {
    throw generateError('consultations table not found', 404)
  }
}