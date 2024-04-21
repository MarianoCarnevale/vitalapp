import { getPool } from "../../db/getPool.js"
import { generateError } from "../../utils/errors/generateError.js";

export const putConsultations = async (data, next) => {
    const {
      consultation_id, 
      user_id, doctor_id, 
      title, 
      description, 
      file, 
      discipline_id, 
      severity
    } = data

    //Esperamos conexion de la base de datos
    const pool = await getPool();
    
    const [result] = await pool.query(`INSERT INTO vitalapp.consultations (consultation_id, user_id, doctor_id, title, description, file, discipline_id, severity ) VALUES (?, ?, ?, ?, ?, ?, ?, ? )`,[
      consultation_id, 
      user_id, 
      doctor_id, 
      title, 
      description, 
      file, 
      discipline_id, 
      severity
    ])

    // Verificar si el insert afectó a alguna línea.
    if (result.affectedRows === 0) {
      throw generateError('No se ha podido insertar el usuario', 500);
    }
    message = "Consultations created"

}