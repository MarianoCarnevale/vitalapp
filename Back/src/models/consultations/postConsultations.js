import { getPool } from '../../db/getPool.js';
import { generateError } from '../../utils/errors/generateError.js';
import { selectConsultations } from './selectConsultations.js';

export const postConsultations = async (data, img) => {
  const {
    consultation_id,
    user_id,
    doctor_id,
    title,
    description,
    file,
    discipline_id,
    severity,
  } = data;

  //Esperamos conexion de la base de datos
  const pool = await getPool();
  let query = `INSERT INTO vitalapp.consultations (consultation_id, user_id, doctor_id, title, description, file, discipline_id, severity ) VALUES (?, ?, ?, ?, ?, ?, ?, ? )`;

  const [result] = await pool.query(query, [
    consultation_id,
    user_id,
    doctor_id,
    title,
    description,
    file,
    discipline_id,
    severity,
  ]);

  // const consultations = selectConsultations(`WHERE C.consultation_id = ${consultation_id}`)
  // console.log(consultations);
  // Verificar si el insert afectó a alguna línea.
  if (result.affectedRows === 0) {
    throw generateError('No se ha podido insertar el usuario', 500);
  }

  // return result;
};
