import { getPool } from '../../db/getPool.js';
export const getDoctorsModel = async (doctor_id) => {
  try {
    // Crear la conexión a la base de datos.
    const pool = await getPool();

    // Obtener el doctor.
    const [doctors] = await pool.query(`
    SELECT * FROM users
    JOIN doctors ON users.user_id = doctors.user_id
    JOIN doctors_disciplines ON doctors.doctor_id = doctors_disciplines.doctor_id
    JOIN disciplines ON doctors_disciplines.discipline_id = disciplines.discipline_id
    WHERE users.role = 'doctor'; `);

    return doctors;
  } catch (error) {
    // console.log(error.message);
    throw error;
  }
};
