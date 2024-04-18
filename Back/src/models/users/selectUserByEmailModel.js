import { getPool } from '../../db/getPool.js';

export const selectUserByEmailModel = async (email) => {
  const pool = await getPool();

  // Obtener el usuario con ese email.
  const [user] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
    email,
  ]);
  return user[0];
};
