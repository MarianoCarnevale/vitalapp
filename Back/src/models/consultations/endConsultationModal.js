import { getPool } from "../../db/getPool.js"

export const endConsultationModal = async (consultation_id) => {

  const pool = await getPool();

  const resp = await pool.query(`
  UPDATE consultations SET is_active = 0 WHERE consultation_id = ?
  `, [consultation_id])

if (resp.affectedRows === 0) {
      throw generateError('No se ha podido finalizar la consulta', 500);
    };
}