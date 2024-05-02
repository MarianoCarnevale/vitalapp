import { getPool } from '../../db/getPool.js';

// Función que realiza una consulta a la base de datos para crear un nuevo usuario.
export const insertDoctorModel = async (
  user_id,
  doctor_registration_number,
  discipline_name,
  experience
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

  // Creamos la query para sacar la id de la disciplina elegida
  let disciplineQuery = `SELECT discipline_id FROM disciplines WHERE discipline_name = ? `;

  // Actualizamos disciplina
  const [discipline] = await pool.query(disciplineQuery, [discipline_name]);

  console.log(discipline[0].discipline_id);

  // Aplicamos lógica para la tabla disciplines

  let doctorDisciplineQuery = `INSERT INTO doctors_disciplines (doctor_id, discipline_id, experience) values (?, ?, ?)`;

  // Actualizamos disciplina
  const [doctorDiscipline] = await pool.query(doctorDisciplineQuery, [
    doctorId,
    discipline[0].discipline_id,
    experience,
  ]);

  // Verificar si el insert afectó a alguna línea.
  if (doctorDiscipline === 0) {
    throw error;
  }
};
