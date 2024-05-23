import { getPool } from "../../db/getPool.js"

export const deleteRatingModel = async (rating_id, user_id) => {
  try {
    //conexion a la base de datos
    const pool = await getPool();
  
    //consulta a la base de datos
    const [result] = await pool.query(`DELETE FROM ratings WHERE rating_id = ? and user_id = ?`, [rating_id, user_id]);
    
    //Verificar que elimino el rating
    if (result.affectedRows === 0) {
      throw generateError('La valoración no pudo ser borrada', 500);
    }
    return;

  } catch (error) {
    throw error;
  }
}