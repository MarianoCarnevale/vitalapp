import { getPool } from '../../db/getPool.js';

export const selectDoctorByUserIdModel = async (userId) => {
  const pool = await getPool();

  // Comprobar si existe un usuario con el id proporcionado.
  const [users] = await pool.query(
    `
    SELECT U.user_id, U.email, U.username, U.role, U.first_name, U.last_name, U.first_surname, U.last_surname, U.avatar, U.bio, U.address, U.phone_number, U.birth_date, U.created_at, U.updated_at, D.doctor_id, D.doctor_registration_number, DS.discipline_id, DS.experience, DI.discipline_name, AVG(r.rating_value) AS avg_rating 
    FROM users U
    INNER JOIN doctors D ON U.user_id = D.user_id
    INNER JOIN doctors_disciplines DS ON D.doctor_id = DS.doctor_id
    INNER JOIN disciplines DI ON DS.discipline_id = DI.discipline_id
    LEFT JOIN 
    consultations c ON D.doctor_id = c.doctor_id
    LEFT JOIN 
    responses res ON c.consultation_id = res.consultation_id
    LEFT JOIN 
    ratings r ON res.response_id = r.response_id
    WHERE U.user_id = ?
    GROUP BY U.user_id, U.email, U.username, U.role, U.first_name, U.last_name, U.first_surname, U.last_surname, U.avatar, U.bio, U.address, U.phone_number, U.birth_date, U.created_at, U.updated_at, D.doctor_id, D.doctor_registration_number, DS.discipline_id, DS.experience, DI.discipline_name;`,
    [userId]
  );

  return users[0];
};
