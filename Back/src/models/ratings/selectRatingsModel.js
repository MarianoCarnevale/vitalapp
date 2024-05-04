import { getPool } from "../../db/getPool.js"

export const selectRatingsModel = async (filter) => { 
  const pool = await getPool();
  
  const [ratings] = await pool.query(`SELECT * FROM ratings ${filter}`);

  return ratings;
}