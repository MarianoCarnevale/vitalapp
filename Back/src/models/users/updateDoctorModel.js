import bcrypt from 'bcrypt';
import { getPool } from '../../db/getPool.js';
import { generateError } from '../../utils/errors/generateError.js';

export const updateDoctorModel = async (
  userId,
  email,
  username,
  password,
  first_name,
  last_name,
  first_surname,
  last_surname,
  bio,
  address,
  phone_number,
  birth_date,
  doctor_registration_number,
  discipline_name,
  experience
) => {
  const pool = await getPool();

  // Crear la query.
  let query = `UPDATE users U 
  INNER JOIN doctors D ON U.user_id = D.user_id
  INNER JOIN doctors_disciplines DS ON D.doctor_id = DS.doctor_id
  INNER JOIN disciplines DI ON DS.discipline_id = DI.discipline_id
  SET 
  U.email = ?, U.username = ?`;

  // Crear el array de valores email y username
  let values = [email, username];

  //Si hay contraseña hasheamos y la cambiamos
  if (password) {
    // Hasheamos el nuevo password
    const passwordHashed = await bcrypt.hash(password, 10);
    query += `, U.password = ?`;
    values.push(passwordHashed);
  }

  // Añadimos valor obligatorio first_name
  query += `, U.first_name = ?`;
  values.push(first_name);

  // Si hay segundo nombre, lo añadimos
  if (last_name) {
    query += `, U.last_name = ?`;
    values.push(last_name);
  } else {
    query += `, U.last_name = NULL`;
  }

  // Añadimos valor obligatorio primer apellido
  query += `, first_surname = ?`;
  values.push(first_surname);

  // Si hay segundo apellido, lo añadimos
  if (last_surname) {
    query += `, U.last_surname = ?`;
    values.push(last_surname);
  } else {
    query += `, U.last_surname = NULL`;
  }

  // SI hay bio, añadirla a la query.
  if (bio) {
    query += `, U.bio = ?`;
    values.push(bio);
  } else {
    query += `, U.bio = NULL`;
  }

  // Si hay adress, añadirlas a la query.
  if (address) {
    query += `, U.address = ?`;
    values.push(address);
  } else {
    query += `, U.address = NULL`;
  }

  // Si hay phone_number, añadirlas a la query.
  if (phone_number) {
    query += `, U.phone_number = ?`;
    values.push(phone_number);
  } else {
    query += `, U.phone_number = NULL`;
  }

  // Si hay birth_date, añadirlas a la query.
  if (birth_date) {
    query += `, U.birth_date = ?`;
    values.push(birth_date);
  } else {
    query += `, U.birth_date = NULL`;
  }

  // Añadimos valor obligatorio doctor_registration_number.
  query += `, D.doctor_registration_number = ?`;
  values.push(doctor_registration_number);

  // Averiguamos la id de la disciplina elegida

  const [discipline] = await pool.query(
    `SELECT discipline_id FROM disciplines WHERE discipline_name = ?`,
    [discipline_name]
  );

  const disciplineId = discipline[0].discipline_id;

  // Añadimos valor obligatorio discipline_id.
  query += `, DS.discipline_id = ?`;
  values.push(disciplineId);

  // Añadimos valor obligatorio experience.
  query += `, DS.experience = ?`;
  values.push(experience);

  // Añadir el resto de la query.
  query += ` WHERE U.user_id = ?`;

  // Actualizar el usuario con esa id con la información del body.
  const [result] = await pool.query(query, [...values, userId]);

  // Si no se ha actualizado ningún usuario, lanzar un error.
  if (result.affectedRows === 0) {
    throw generateError('No se ha modificado el perfil del usuario', 500);
  }

  // Devolver el resultado.
  return result;
};
