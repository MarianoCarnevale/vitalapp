import { getPool } from '../../db/getPool.js';
import { generateError } from '../../utils/errors/generateError.js';

export const deleteConsultationFileModel = async (user_id, consultation_id) => {
  const pool = await getPool();
  try {
    await pool.query(
      `
      UPDATE consultations
      SET file = NULL
      WHERE user_id = ? AND consultation_id = ?
      `,
      [user_id, consultation_id]
    );
  } catch (error) {
    throw generateError(
      `No se pudo borrar el archivo de la consulta para el usuario ${user_id} y la consulta ${consultation_id}`,
      500
    );
  }
};
