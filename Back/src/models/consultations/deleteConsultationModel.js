import { getPool } from "../../db/getPool.js";

export const deleteConsultationModel = async (consultation_id) => {
  try {
    const pool = await getPool();
    
    await pool.query(`DELETE FROM consultations WHERE consultation_id = ?`,[consultation_id])
    
  } catch (error) {
    console.log('Error al borrar la consulta: ', error);
  }
}