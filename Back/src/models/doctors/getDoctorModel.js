import { getPool } from '../../db/getPool.js';
export const getDoctorModel = async (doctor_id) => {
  try {
    // Crear la conexión a la base de datos.
    const pool = await getPool();

    // Obtener el doctor.
    const [doctor] = await pool.query(
      `
      SELECT * FROM users
      JOIN doctors ON users.user_id = doctors.user_id
      JOIN doctors_disciplines ON doctors.doctor_id = doctors_disciplines.doctor_id
      JOIN disciplines ON doctors_disciplines.discipline_id = disciplines.discipline_id
      WHERE users.role = 'doctor' AND doctors.doctor_id = ?`,
      [doctor_id]
    );

    if (doctor[0] === undefined) {
      const error = new Error('No such Doctor');
      error.code = 'DOCTOR SEARCH ERROR';
      throw error;
    }

    return doctor[0];
  } catch (error) {
    console.log('Error finding the doctor', error);
    throw error;
  }
};
