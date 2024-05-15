import { getPool } from "../../db/getPool.js"

export const selectRatingsModel = async (filter) => { 
  try {
    const pool = await getPool();
    
    const [ratings] = await pool.query(`SELECT * FROM ratings ${filter}`);
  
    return ratings;
  } catch (error) {
    console.log('Error al seleccionarla valoración: ',error);
  }
}