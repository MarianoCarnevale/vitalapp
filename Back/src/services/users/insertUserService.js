// Importar el módulo bcrypt.
import bcrypt from 'bcrypt';

// Importar los modelos.
import {
  insertUserModel,
  selectUserByEmailModel,
  selectUserByUsernameModel,
  selectDoctorByDoctorRegistrationNumberModel,
} from '../../models/users/index.js';

// Importar las utilidades.
import { sendEmailUtil } from '../../utils/sendEmailUtil.js';

// Importar los módulos de error.
import { generateError } from '../../utils/errors/generateError.js';
import { insertDoctorModel } from '../../models/users/insertDoctorModel.js';

export const insertUserService = async (
  username,
  email,
  password,
  role,
  validation_code,
  recovery_code,
  first_name,
  first_surname,
  doctor_registration_number,
  disciplines
) => {
  try {
    // Buscamos en la base de datos algún usuario con ese nombre.
    let existUser = await selectUserByUsernameModel(username);

    // Si existe un usuario con ese nombre, lanzamos un error.
    if (existUser) {
      throw generateError('Ya existe un usuario con ese username', 400);
    }

    // Buscamos en la base de datos algún usuario con ese email.
    existUser = await selectUserByEmailModel(email);

    // Si existe un usuario con ese email, lanzamos un error.
    if (existUser) {
      throw generateError('Ya existe un usuario con ese email', 400);
    }

    // Comprobamos que no existe un médico con el mismo doctor_registration_number
    let existDoctor = await selectDoctorByDoctorRegistrationNumberModel(
      doctor_registration_number
    );

    // Si existe, comprobar si es el mismo usuario.
    if (existDoctor) {
      throw generateError(
        'Ya existe un medico con ese doctor registration number',
        403
      );
    }

    // Hasheamos la contraseña.
    const hashedPass = await bcrypt.hash(password, 10);

    // Creamos una id para el usuario.
    const user_id = crypto.randomUUID();

    // Insertamos el usuario en la base de datos.
    await insertUserModel(
      user_id,
      username,
      email,
      hashedPass,
      role,
      validation_code,
      recovery_code,
      first_name,
      first_surname
    );

    //Insertamos los datos del usuario en las tablas relacionadas con doctor si lo es

    if (role === 'doctor') {
      await insertDoctorModel(user_id, doctor_registration_number, disciplines);
    }

    // Creamos el asunto del email de verificación.
    const emailSubject = 'Activa tu usuario en vitalApp';

    // Creamos el cuerpo del email de verificación.
    const emailText = `
    ¡Bienvenid@ ${username} a VitalApp!
    Gracias por registrarte en nuestra aplicación. Para activar tu cuenta, haz click en el siguiente enlace:
    <a href="${process.env.VALIDATION_URL}/${validation_code}">Activa tu cuenta</a>    `;

    // Enviamos el email de verificación.
    await sendEmailUtil(email, emailSubject, emailText);
  } catch (error) {
    // Manejar el error aquí.
    throw error;
  }
};
