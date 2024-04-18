import { getPool } from '../../db/getPool.js';

export const selectUserByIdModel = async (userId) => {
  const pool = await getPool();

  // Comprobar si existe un usuario con el id proporcionado.
  const [users] = await pool.query(`SELECT * FROM users WHERE id = ?`, [
    userId,
  ]);

  return users[0];
};
