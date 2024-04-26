import { getPool } from '../../db/getPool.js';

// Función que realiza una consulta a la base de datos para crear un nuevo usuario.
export const insertDoctorModel = async (
  user_id,
  doctor_registration_number,
  disciplines
) => {
  // Crear un pool de conexiones.
  const pool = await getPool();

  // Insertamos el doctor en la base de datos.

  //Aplicamos la lógica aparte del user, para el doctor
  let doctorQuery = `INSERT INTO doctors (doctor_id, user_id, doctor_registration_number) values (?, ?, ?)`;

  // Creamos el id de doctor
  const doctorId = crypto.randomUUID();

  // Actualizar el doctor con esa id con la información del body.
  const [doctor] = await pool.query(doctorQuery, [
    doctorId,
    user_id,
    doctor_registration_number,
  ]);

  // Conseguimos el id de la disciplina a través del nombre para insertarla en la tabla doctors_discipline

  let disciplineQuery = `SELECT discipline_id FROM disciplines WHERE discipline_name = (?)`;

  // Actualizamos disciplina
  const [disciplineId] = await pool.query(disciplineQuery, [
    disciplines.first_discipline[0],
  ]);

  console.log(disciplineId);

  // Aplicamos lógica para la tabla disciplines

  let doctorDisciplineQuery = `INSERT INTO doctors_disciplines (doctor_id, discipline_id, experience) values (?, ?, ?)`;

  // Actualizamos tabla doctor_disciplina
  const [doctorDiscipline] = await pool.query(doctorDisciplineQuery, [
    doctorId,
    disciplineId[0].discipline_id,
    disciplines.first_discipline[1],
  ]);

  // Verificar si el insert afectó a alguna línea.
  if (doctorDiscipline === 0) {
    throw error;
  }

  // Si existe segunda disciplina, repetimos el proceso

  // Conseguimos el id de la disciplina a través del nombre para insertarla en la tabla doctors_discipline

  if (disciplines.second_discipline) {
    // Actualizamos disciplina
    const [disciplineId2] = await pool.query(disciplineQuery, [
      disciplines.second_discipline[0],
    ]);

    console.log(disciplineId2);

    // Actualizamos disciplina
    const [doctorDiscipline2] = await pool.query(doctorDisciplineQuery, [
      doctorId,
      disciplineId2[0].discipline_id,
      disciplines.second_discipline[1],
    ]);

    // Verificar si el insert afectó a alguna línea.
    if (doctorDiscipline2 === 0) {
      throw error;
    }
  }

  // Si existe tercera disciplina, repetimos el proceso

  // Conseguimos el id de la disciplina a través del nombre para insertarla en la tabla doctors_discipline

  if (disciplines.second_discipline) {
    // Actualizamos disciplina
    const [disciplineId3] = await pool.query(disciplineQuery, [
      disciplines.third_discipline[0],
    ]);

    console.log(disciplineId3);

    // Actualizamos disciplina
    const [doctorDiscipline3] = await pool.query(doctorDisciplineQuery, [
      doctorId,
      disciplineId3[0].discipline_id,
      disciplines.third_discipline[1],
    ]);

    // Verificar si el insert afectó a alguna línea.
    if (doctorDiscipline3 === 0) {
      throw error;
    }
  }
};
