import { getPool } from "../../db/getPool.js"
import { generateError } from "../../utils/errors/generateError.js";

export const selectConsultations = async (filter) => {
  try {
    //Esperamos conexion de la base de datos
    const pool = await getPool();

    console.log(filter);
    if(!filter){filter = ''}
  
    //Consulta con datos desde la tabla consultations y subconsulta con todos los datos de los medicos y su join para ligarlos con su correspondiente consulta
    
      const [consultations] = await pool.query(`
        SELECT 
        C.consultation_id, 
        doctor.doctorID, doctor.doctor_first_name AS doctor_Name,doctor.doctor_last_name AS doctor_last_name,
        doctor.speciality AS speciality ,
        doctor.doctor_rating,
        U.user_id, U.first_name, U.last_name,
        C.title, C.description, C.file, C.severity, C.created_at
      FROM consultations C
      LEFT JOIN (
          SELECT D.doctor_id as doctorID, U.first_name AS doctor_first_name, U.last_name AS doctor_last_name,DS.name AS speciality,
          R.rating_value AS doctor_rating
          FROM doctors D 
          JOIN users U ON D.user_id = U.user_id
          JOIN disciplines DS ON D.doctor_id = DS.discipline_id
          LEFT JOIN ratings R ON U.user_id = R.rating_id
      ) AS doctor ON C.doctor_id = doctor.doctorID
      JOIN users U ON C.user_id = U.user_id
          ${filter}`
        );
      return [consultations]
  } catch (error) {
    throw generateError('consultations table not found', 404)
  }
}