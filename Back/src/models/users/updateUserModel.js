// Importar el módulo bcrypt.
import bcrypt from 'bcrypt';
import { getPool } from '../../db/getPool.js';
import { generateError } from '../../utils/errors/generateError.js';

export const updateUserModel = async (
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
  birth_date
) => {
  const pool = await getPool();

  // Crear la query.
  let query = `UPDATE users SET email = ?, username = ?`;

  // Crear el array de valores obligados menos el primer apellido
  let values = [email, username];

  // Si hay password, hasheamos y la añadimos
  if (password) {
    query += `, password = ?`;
    // Hasheamos el nuevo password
    const passwordHashed = await bcrypt.hash(password, 10);
    values.push(passwordHashed);
  }

  // Añadimos valor obligatorio primer nombre
  query += `, first_name = ?`;
  values.push(first_name);

  // Si hay segundo nombre, lo añadimos
  if (last_name) {
    query += `, last_name = ?`;
    values.push(last_name);
  } else {
    query += `, last_name = NULL`;
  }

  // Añadimos valor obligatorio primer apellido
  query += `, first_surname = ?`;
  values.push(first_surname);

  // Si hay segundo apellido, lo añadimos
  if (last_surname) {
    query += `, last_surname = ?`;
    values.push(last_surname);
  } else {
    query += `, last_surname = NULL`;
  }

  // SI hay bio, añadirla a la query.
  if (bio) {
    query += `, bio = ?`;
    values.push(bio);
  } else {
    query += `, bio = NULL`;
  }

  // Si hay adress, añadirlas a la query.
  if (address) {
    query += `, address = ?`;
    values.push(address);
  } else {
    query += `, address = NULL`;
  }

  // Si hay phone_number, añadirlas a la query.
  if (phone_number) {
    query += `, phone_number = ?`;
    values.push(phone_number);
  } else {
    query += `, phone_number = NULL`;
  }

  // Si hay birth_date, añadirlas a la query.
  if (birth_date) {
    query += `, birth_date = ?`;
    values.push(birth_date);
  } else {
    query += `, birth_date = NULL`;
  }

  // Añadir el where.
  query += ` WHERE user_id = ?`;

  // Actualizar el usuario con esa id con la información del body.
  const [result] = await pool.query(query, [...values, userId]);

  // Si no se ha actualizado ningún usuario, lanzar un error.
  if (result.affectedRows === 0) {
    throw generateError('No se ha modificado el perfil del usuario', 500);
  }

  // Devolver el resultado.
  return result;
};
