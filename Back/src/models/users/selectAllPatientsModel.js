import { getPool } from '../../db/getPool.js';
import { generateError } from '../../utils/errors/generateError.js';
export const selectAllPatientsModel = async () => {
  try {
    // Crear la conexión a la base de datos.
    const pool = await getPool();

    // Obtener los pacientes.
    const [patients] = await pool.query(
      `
      SELECT * FROM users
      WHERE users.role = 'patient' AND users.is_active = 1;
      `
    );

    if (patients[0] === undefined) {
      throw generateError('No patients found', 404);
    }

    return patients;
  } catch (error) {
    throw error;
  }
};
