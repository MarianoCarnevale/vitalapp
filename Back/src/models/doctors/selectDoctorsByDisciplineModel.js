import { getPool } from '../../db/getPool.js';
import { generateError } from '../../utils/errors/generateError.js';
export const selectDoctorsByDiscipline = async (discipline_id) => {
  try {
    // Crear la conexión a la base de datos.
    const pool = await getPool();

    // Obtener el doctor.
    const [doctors] = await pool.query(
      `
      SELECT 
      u.user_id,
      doc.doctor_id,
      u.email,
      u.username,
      u.first_name,
      u.last_name,
      u.first_surname,
      u.last_surname,
      u.is_active,
      d.discipline_name,
      AVG(r.rating_value) AS avg_rating
  FROM 
      users u
  JOIN 
      doctors doc ON u.user_id = doc.user_id
  JOIN 
      doctors_disciplines dd ON doc.doctor_id = dd.doctor_id
  JOIN 
      disciplines d ON dd.discipline_id = d.discipline_id
  LEFT JOIN 
      consultations c ON doc.doctor_id = c.doctor_id
  LEFT JOIN 
      responses res ON c.consultation_id = res.consultation_id
  LEFT JOIN 
      ratings r ON res.response_id = r.response_id
  WHERE 
      u.role = 'doctor' AND dd.discipline_id = ? AND u.is_active = 1
  GROUP BY 
      u.user_id, doc.doctor_id, u.first_name, d.discipline_name;
      `,
      [discipline_id]
    );

    if (doctors[0] === undefined) {
      throw generateError('Doctores no encontrados', 404);
    }

    return doctors;
  } catch (error) {
    throw error;
  }
};
