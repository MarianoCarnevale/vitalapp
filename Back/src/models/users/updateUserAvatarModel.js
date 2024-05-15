import { getPool } from '../../db/getPool.js';
import { generateError } from '../../utils/errors/generateError.js';

export const updateUserAvatarModel = async (userId, avatarName) => {
  const pool = await getPool();

  const [result] = await pool.query(
    `UPDATE users SET avatar = ? WHERE user_id = ?`,
    [avatarName, userId]
  );

  if (result.affectedRows === 0) {
    throw generateError('No se ha podido actualizar el avatar', 500)
  }

  return result;
};
