import { getPool } from '../../db/getPool.js';

export const getAllDisciplinesWithDoctorsModel = async () => {
  try {
    const pool = await getPool();
    const [disciplines] = await pool.query(
      `
      SELECT DISTINCT d.* 
      FROM disciplines d
      INNER JOIN doctors_disciplines dd ON d.discipline_id = dd.discipline_id;
      `
    );
    return disciplines;
  } catch (error) {
    throw error;
  }
};
