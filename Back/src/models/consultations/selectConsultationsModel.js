import { getPool } from '../../db/getPool.js';
import { generateError } from '../../utils/errors/generateError.js';

export const selectConsultationsModel = async (consultation_id) => {
  try {
    //Esperamos conexion de la base de datos
    const pool = await getPool();

    const [consultations] = await pool.query(
      `
      SELECT 
  C.consultation_id, 
  C.is_pending,
  C.is_active,
  doctor_avatar, 
  doctor.doctor_id AS doctor_id, 
  doctor.doctor_first_name AS doctor_Name,
  doctor.doctor_surname,
  doctor.user_id AS doctor_user_id, 
  U.user_id, 
  U.first_name, 
  U.first_surname, 
  U.avatar,
  discipline_name, 
  avg_rating.avg_rating_value AS avg_rating, 
  C.title, 
  C.description, 
  C.file, 
  C.severity, 
  C.created_at 
FROM 
  consultations C
LEFT JOIN (
  SELECT 
      D.doctor_id as doctor_id, 
      U.first_name AS doctor_first_name, 
      U.first_surname AS doctor_surname ,
      U.avatar AS doctor_avatar,
      U.user_id AS user_id
  FROM 
      doctors D 
  INNER JOIN 
      users U ON D.user_id = U.user_id
) AS doctor ON C.doctor_id = doctor.doctor_id
LEFT JOIN disciplines DIS ON DIS.discipline_id = C.discipline_id 
LEFT JOIN (
  SELECT 
      doc.doctor_id,
      AVG(r.rating_value) AS avg_rating_value -- Cambiado para obtener la calificación promedio
  FROM 
      users u
  JOIN 
      doctors doc ON u.user_id = doc.user_id
  LEFT JOIN 
      responses res ON doc.user_id = res.user_id
  LEFT JOIN 
      ratings r ON res.response_id = r.response_id
  WHERE 
      u.role = 'doctor' 
      AND u.is_active = 1 
  GROUP BY 
      doc.doctor_id
) AS avg_rating ON C.doctor_id = avg_rating.doctor_id
JOIN 
  users U ON C.user_id = U.user_id
WHERE 
  C.consultation_id = ?
            `,
      [consultation_id]
    );

    return [consultations];
  } catch (error) {
    throw generateError('consulta no encontrada', 404);
  }
};
