import { updateUserService } from '../../services/users/updateUserService.js';
import { updateUserSchema } from '../../schemas/users/updateUserSchema.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { updateDoctorSchema } from '../../schemas/users/updateDoctorSchema.js';
import { updateDoctorService } from '../../services/users/updateDoctorService.js';

export const updateUserController = async (req, res, next) => {
  try {
    // Obtenemos el userId
    const userId = req.user.id;

    //Obtenemos el rol del usuario
    const userRol = req.user.role;

    // Creamos la variable a alcance global newUserName
    let newUsername;

    // Lógica para actualizar información según si es doctor o paciente

    if (userRol === 'patient') {
      // Validar el body con Joi.
      await validateSchemaUtil(updateUserSchema, req.body);

      // Actualizamos el usuario en la base de datos.
      const user = await updateUserService(userId, req.body);

      // Enviamos solo el username actualizado
      newUsername = user.username;
    }

    if (userRol === 'doctor') {
      // Validar el body con Joi.
      await validateSchemaUtil(updateDoctorSchema, req.body);

      // Actualizamos el usuario en la base de datos.
      const user = await updateDoctorService(userId, req.body);

      // Enviamos solo el username actualizado
      newUsername = user.username;
    }

    res.send({
      status: 'ok',
      message: 'Usuario actualizado',
      data: { newUsername },
    });
  } catch (error) {
    next(error);
  }
};
