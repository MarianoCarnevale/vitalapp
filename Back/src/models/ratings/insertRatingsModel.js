import { getPool } from "../../db/getPool.js"

export const insertRatingModel = async (data) => {
  try {
    
  } catch (error) {
    console.log('Error al crear una valoracion nueva: ',error);
  }
  const pool = await getPool();

  const { rating_id, response_id, user_id, rating_value } = data

  const [result] = await pool.query(`  
    INSERT INTO ratings (rating_id, response_id, user_id, rating_value) VALUES (?, ?, ?, ?)
      `,[rating_id, response_id, user_id, rating_value])

   if (result.affectedRows === 0) {
    throw generateError('No se ha podido insertar actualizar la valoracion', 500);
  }
}