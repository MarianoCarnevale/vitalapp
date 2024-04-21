import { getPool } from '../../db/getPool.js';
import { generateError } from '../../utils/errors/generateError.js';

export const updateDoctorModel = async (
  userId,
  email,
  username,
  first_name,
  last_name,
  first_surname,
  last_surname,
  bio,
  adress,
  phone_number,
  birth_date,
  doctor_registration_number,
  discipline_name,
  experience
) => {
  try {
    const pool = await getPool();

    // Crear la query.
    let query = `UPDATE users SET email = ?, username = ?, first_name = ?`;

    // Crear el array de valores obligados menos el primer apellido
    let values = [email, username, first_name];

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
    if (adress) {
      query += `, adress = ?`;
      values.push(adress);
    } else {
      query += `, adress = NULL`;
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
    const [user] = await pool.query(query, [...values, userId]);

    // Si no se ha actualizado ningún usuario, lanzar un error.
    if (user.affectedRows === 0) {
      throw generateError('No se ha modificado el perfil del usuario', 500);
    }

    //Aplicamos la lógica aparte del user, para el doctor
    let doctorQuery = `INSERT INTO doctors (doctor_id, user_id, doctor_registration_number) values (?, ?, ?)`;

    // Creamos el id de doctor
    const doctorId = crypto.randomUUID();

    // Actualizar el doctor con esa id con la información del body.
    const [doctor] = await pool.query(doctorQuery, [
      doctorId,
      userId,
      doctor_registration_number,
    ]);

    console.log(doctor);

    // Aplicamos lógica para la tabla disciplines

    let discplineQuery = `INSERT INTO disciplines (discipline_id, name) values (?, ?)`;

    // Creamos el id de disciplina
    const disciplineId = crypto.randomUUID();

    // Actualizamos disciplina
    const [discipline] = await pool.query(discplineQuery, [
      disciplineId,
      discipline_name,
    ]);

    console.log(discipline);

    // Aplicamos lógica para la tabla disciplines

    let doctorDisciplineQuery = `INSERT INTO doctors_disciplines (doctor_id, discipline_id, experience) values (?, ?, ?)`;

    // Actualizamos disciplina
    const [doctorDiscipline] = await pool.query(doctorDisciplineQuery, [
      doctorId,
      disciplineId,
      experience,
    ]);

    console.log(doctorDiscipline);

    // Devolver el resultado.
    return user;
  } catch (error) {
    console.log(error.message);
  }
};
