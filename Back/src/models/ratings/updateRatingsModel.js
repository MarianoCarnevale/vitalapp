import { getPool } from "../../db/getPool.js"

export const updateRatingsModel = async (rating_id, rating_value) => { 
  try {
    const pool = await getPool();

    const [result] = await pool.query(`UPDATE ratings SET rating_value = ${rating_value} WHERE  rating_id = ${rating_id}`)
  
     if (result.affectedRows === 0) {
      throw generateError('No se ha podido actualizar la valoracion', 500);
    }
    
    return;
  } catch (error) {
    throw error;
  }
}