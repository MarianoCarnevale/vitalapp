import { getPool } from "../../db/getPool.js";
import { generateError } from "../../utils/errors/generateError.js";

export const selectConsultationsBySeverity = async (severity, user_id) => {
  try {
    //Esperamos conexion de la base de datos
    const pool = await getPool();

    //Peticon a la base de datos
    const [consultations] = await pool.query(`
    SELECT * FROM consultations WHERE severity = ? AND user_id = ?`[severity, user_id] 
  );
    
    //retorno de los datos
    return consultations;
    
  } catch (error) {
    throw generateError('consultation not found', 404)
  }
}