import { getPool } from '../../db/getPool.js';

export const getAllDisciplinesModel = async () => {
  try {
    // Crear la conexión a la base de datos.
    const pool = await getPool();

    // Obtener el doctor.
    const [disciplines] = await pool.query(
      `
      SELECT * FROM disciplines;
      `
    );
    return disciplines;
  } catch (error) {
    // console.log(error.message);
    throw error;
  }
};
