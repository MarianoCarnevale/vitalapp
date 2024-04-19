// Importar el módulo bcrypt.
import bcrypt from 'bcrypt';

// Importar los modelos.
import {
  insertUserModel,
  selectUserByEmailModel,
  selectUserByUsernameModel,
} from '../../models/users/index.js';

// Importar las utilidades.
import { sendEmailUtil } from '../../utils/sendEmailUtil.js';

// Importar los módulos de error.
import { generateError } from '../../utils/errors/generateError.js';

export const insertUserService = async (
  username,
  email,
  password,
  role,
  validation_code,
  recovery_code,
  first_name,
  first_surname
) => {
  try {
    // Buscamos en la base de datos algún usuario con ese nombre.
    let existUser = await selectUserByUsernameModel(username);

    // Si existe un usuario con ese nombre, lanzamos un error.
    if (existUser) {
      usernameAlreadyRegisteredError();
      throw generateError('No hay usuarios con ese nombre', 400);
    }

    // Buscamos en la base de datos algún usuario con ese email.
    existUser = await selectUserByEmailModel(email);

    // Si existe un usuario con ese email, lanzamos un error.
    if (existUser) {
      emailAlreadyRegisteredError();
      throw generateError('No hay usuarios con ese email', 400);
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

    // Creamos el asunto del email de verificación.
    const emailSubject = 'Activa tu usuario en Diario de Viajes :)';

    // Creamos el cuerpo del email de verificación.
    const emailText = `
    ¡Bienvenid@ ${username} a VitalApp!
    Gracias por registrarte en nuestra aplicación. Para activar tu cuenta, haz click en el siguiente enlace:
    <a href="http://localhost:5173/validate/${validation_code}">Activa tu cuenta</a>
    `;

    // Enviamos el email de verificación.
    await sendEmailUtil(email, emailSubject, emailText);
  } catch (error) {
    // Manejar el error aquí.
    throw generateError('Error al insertar el usuario', 500);
  }
};
