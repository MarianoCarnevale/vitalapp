import { getPool } from '../../db/getPool.js';
import { generateError } from '../../utils/errors/generateError.js';

export const selectConsultations = async (filter) => {
  try {
    //Esperamos conexion de la base de datos
    const pool = await getPool();

    if (!filter) {
      filter = '';
    }

    const [consultations] = await pool.query(`
    SELECT 
    C.consultation_id, 
    doctor.doctor_id, doctor.doctor_first_name AS doctor_Name,doctor.doctor_last_name AS doctor_last_name,
    doctor.speciality AS speciality ,
    doctor.doctor_rating,
    U.user_id, U.first_name, U.last_name,
    C.title, C.description, C.file, C.severity, C.created_at
  FROM consultations C
  LEFT JOIN (
      SELECT D.doctor_id as doctor_id, U.first_name AS doctor_first_name, U.last_name AS doctor_last_name,DS.name AS speciality,
      R.rating_value AS doctor_rating
      FROM doctors D 
      INNER JOIN users U ON D.user_id = U.user_id
      INNER JOIN doctors_disciplines DDS ON D.doctor_id = DDS.doctor_id
      INNER JOIN disciplines DS ON DS.discipline_id = DDS.discipline_id
      LEFT JOIN ratings R ON U.user_id = R.rating_id
  ) AS doctor ON C.doctor_id = doctor.doctor_id
  JOIN users U ON C.user_id = U.user_id
          ${filter}`);

    return [consultations];
  } catch (error) {
    throw generateError('consultations table not found', 404);
  }
};
