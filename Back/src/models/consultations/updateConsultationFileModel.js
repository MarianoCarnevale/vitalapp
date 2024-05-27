import { getPool } from "../../db/getPool.js"

export const updateConsultationFileModel = async ( consultation_id ,imgName ) => { 
  try {
    const pool = await getPool();

    const [result] = await pool.query(`UPDATE consultations SET file = ? WHERE consultation_id = ?`, [imgName, consultation_id]);
  
    if (result.affectedRows === 0) {
      throw generateError('No se ha podido insertar el usuario', 500);
    };
    return result;
    
  } catch (error) {
    throw error;
  }
}