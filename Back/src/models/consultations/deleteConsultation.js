import { getPool } from "../../db/getPool.js";

export const deleteConsultation = async (consultation_id) => {
  const pool = await getPool();
  
  await pool.query(`DELETE FROM consultations WHERE consultation_id = ?`,[consultation_id])
}