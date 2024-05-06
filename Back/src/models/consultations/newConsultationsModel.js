import { getPool } from '../../db/getPool.js';
import { generateError } from '../../utils/errors/generateError.js';

export const newConsultationsModel = async (data, img) => {
  try {
    
    const {
      consultation_id,
      user_id,
      doctor_id,
      title,
      description,
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
      img,
      discipline_id,
      severity,
    ]);
  
    // Verificar si el insert afectó a alguna línea.
    if (result.affectedRows === 0) {
      throw generateError('No se ha podido insertar el usuario', 500);
    };
  } catch (error) {
    console.log('Error al insertar usuario: ',error);
  }
};
