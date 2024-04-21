import {
  selectUserByEmailModel,
  selectUserByIdModel,
  selectUserByUsernameModel,
  updateDoctorModel,
} from '../../models/users/index.js';

import { generateError } from '../../utils/errors/generateError.js';

export const updateDoctorService = async (userId, body) => {
  try {
    // Desestructurar la body.
    const {
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
      experience,
    } = body;

    // Comprobar si ese username ya existe.
    let existUser = await selectUserByUsernameModel(username);
    console.log(existUser);

    // Si existe, comprobar si es el mismo usuario.
    if (existUser && existUser.id !== userId) {
      throw generateError('Ya existe un usuario con ese username', 403);
    }

    console.log('No hay usuarios con ese nombre');

    // Comprobar si ese email ya existe.
    existUser = await selectUserByEmailModel(email);

    // Si existe, comprobar si es el mismo usuario.
    if (existUser && existUser.id !== userId) {
      throw generateError('Ya existe un usuario con ese email', 403);
    }

    // Actualizar el usuario en la base de datos.
    await updateDoctorModel(
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
    );

    // Obtener el usuario actualizado.
    const user = await selectUserByIdModel(userId);

    // Devolver el usuario actualizado.
    return user;
  } catch (error) {
    console.log('Error al actualizar el usuario', error);
    throw error;
  }
};
