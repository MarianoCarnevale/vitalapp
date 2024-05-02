import { getPool } from '../../db/getPool.js';

export const selectDoctorByUserIdModel = async (userId) => {
  const pool = await getPool();

  // Comprobar si existe un usuario con el id proporcionado.
  const [users] = await pool.query(
    `
  SELECT U.user_id, U.email, U.username, U.role, U.first_name, U.last_name, U.first_surname, U.last_surname, U.avatar, U.bio, U.address, U.phone_number, U.birth_date, U.created_at, U.updated_at, D.doctor_id, D.doctor_registration_number, DS.discipline_id, DS.experience, DI.name  FROM users U
  INNER JOIN doctors D ON U.user_id = D.user_id
  INNER JOIN doctors_disciplines DS ON D.doctor_id = DS.doctor_id
  INNER JOIN disciplines DI ON DS.discipline_id = DI.discipline_id
  WHERE U.user_id = ?`,
    [userId]
  );

  return users[0];
};
