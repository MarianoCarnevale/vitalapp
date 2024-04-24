import { getPool } from "../../db/getPool.js"
import { generateError } from "../../utils/errors/generateError.js";

export const postConsultations = async (data ,img) => {
    const { 
      consultation_id,
      user_id, doctor_id, 
      title, 
      description, 
      file, 
      discipline_id, 
      severity
    } = data

    // const consultation_id = crypto.randomUUID();

    //Esperamos conexion de la base de datos
    const pool = await getPool();
    let query = `INSERT INTO vitalapp.consultations (consultation_id, user_id, doctor_id, title, description, file, discipline_id, severity ) VALUES (?, ?, ?, ?, ?, ?, ?, ? )`

    
    const [result] = await pool.query(query,[
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

    return [consultation] = pool.query(`
    SELECT * FROM vitalapp.consultations 
    WHERE consultation_id = ?`,[consultation_id])
    return "Consultations created";

}