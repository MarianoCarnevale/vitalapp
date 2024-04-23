import { getPool } from '../../db/getPool.js';

export const selectUserByUsernameModel = async (username) => {
  const pool = await getPool();

  // Obtener el usuario con ese username.
  const [user] = await pool.query(`SELECT * FROM users WHERE username = ?`, [
    username,
  ]);

  // Retornamos el usuario.
  return user[0];
};
