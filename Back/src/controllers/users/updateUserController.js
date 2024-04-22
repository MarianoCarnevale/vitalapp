import { updateUserService } from '../../services/users/updateUserService.js';
import { updateUserSchema } from '../../schemas/users/updateUserSchema.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

export const updateUserController = async (req, res, next) => {
  try {
    // Obtenemos el userId
    const userId = req.user.id;

    // Validar el body con Joi.
    await validateSchemaUtil(updateUserSchema, req.body);

    // Actualizamos el usuario en la base de datos.
    const user = await updateUserService(userId, req.body);

    // Enviamos solo el username actualizado
    const newUsername = user.username;

    res.send({
      status: 'ok',
      message: 'Usuario actualizado',
      data: { newUsername },
    });
  } catch (error) {
    next(error);
  }
};
