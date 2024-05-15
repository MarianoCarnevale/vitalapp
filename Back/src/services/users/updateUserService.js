import {
  selectUserByEmailModel,
  selectUserByIdModel,
  selectUserByUsernameModel,
  updateUserModel,
} from '../../models/users/index.js';

import { generateError } from '../../utils/errors/generateError.js';

export const updateUserService = async (userId, body) => {
  try {
    // Desestructurar la body.
    const {
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
    } = body;

    // Obtener el usuario actual.
    const currentUser = await selectUserByIdModel(userId);

    // Comprobar si el username ha cambiado y, si es así, si el nuevo username ya existe.
    if (username !== currentUser.username) {
      const existUser = await selectUserByUsernameModel(username);
      if (existUser) {
        throw generateError('Ya existe un usuario con ese username', 403);
      }
    }

    // Comprobar si el email ha cambiado y, si es así, si el nuevo email ya existe.
    if (email !== currentUser.email) {
      const existUser = await selectUserByEmailModel(email);
      if (existUser) {
        throw generateError('Ya existe un usuario con ese email', 403);
      }
    }

    // Actualizar el usuario en la base de datos.
    await updateUserModel(
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
    );

    // Obtener el usuario actualizado.
    const user = await selectUserByIdModel(userId);

    // Devolver el usuario actualizado.
    return user;
  } catch (error) {
    throw error;
  }
};
