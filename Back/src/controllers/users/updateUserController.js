// import { updateUserSchema } from '../../schemas/users/updateUserSchema.js';
// import { updateUserService } from '../../services/users/updateUserService.js';
// import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

export const updateUserController = async (req, res, next) => {
  try {
    // Obtenemos el user
    const user = req.user;
    // Obtenemos si es médico o paciente del token
    const userRole = req.user.role;

    // Trabajaremos en función del rol, lo separamos con un condicional

    if (userRole === 'patient') {
      res.send({
        status: 'ok',
        message: 'Paciente actualizado',
        data: { user },
      });
    }

    if (userRole === 'doctor') {
      res.send({
        status: 'ok',
        message: 'Médico actualizado',
        data: { user },
      });
    }

    // // Obtenemos el id del usuario.
    // const userId = req.user.id;

    // // Validar el body con Joi.
    // await validateSchemaUtil(updateUserSchema, req.body);

    // // Actualizamos el usuario en la base de datos.
    // const user = await updateUserService(userId, req.body);
    // // const user = await updateUserModel(userId, req.body);

    // // Devolvemos el usuario actualizado.
    // res.send({
    //   status: 'ok',
    //   message: 'Usuario actualizado',
    //   data: { user },
    // });
  } catch (error) {
    next(error);
  }
};
