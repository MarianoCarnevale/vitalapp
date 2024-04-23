import { getPool } from '../../db/getPool.js';

import { generateError } from '../../utils/errors/generateError.js';

export const selectDoctorByDoctorRegistrationNumberModel = async (
  doctor_registration_number
) => {
  const pool = await getPool();
  try {
    // Obtener el usuario con ese email.
    const [user] = await pool.query(
      `SELECT * FROM doctors WHERE doctor_registration_number = ?`,
      [doctor_registration_number]
    );

    // Devolver el resultado.
    return user[0];
  } catch (error) {
    throw generateError(
      'Ha ocurrido un error al seleccionar al doctor por el registration number',
      404
    );
  }
};
