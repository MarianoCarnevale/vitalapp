import {
  reactivateUserByEmailModel,
  selectUserByEmailModel,
} from '../../models/users/index.js';
import { recoverPassSchema } from '../../schemas/users/recoverPassSchema.js';
import { generateError } from '../../utils/errors/generateError.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
export const reactivateUserController = async (req, res, next) => {
  try {
    // Obtenemos email del body.
    const { email } = req.body;

    // Validamos los datos con Joi, no creamos otro schema por que nos sirve el de recoverPass, ya que solo enviamos un email en el body
    await validateSchemaUtil(recoverPassSchema, req.body);

    // Comprobamos que existe un usuario con ese email y sino lanzamos un error
    const user = await selectUserByEmailModel(email);

    if (!user) {
      throw generateError(
        'No existe un usuario con ese email para reactivar',
        404
      );
    }

    // Comprobamos que el usuario no esté activado
    if (user.is_active === 1) {
      throw generateError('El usuario ya está activo', 500);
    }

    // Si existe y no está activado, reactivamos su cuenta a través de su model
    const userActivated = await reactivateUserByEmailModel(email);

    // Respondemos con un status ok
    res.status(200).send({
      status: 'ok',
      message: 'Usuario activado con éxito',
      data: { userActivated },
    });
  } catch (error) {
    next(error);
  }
};
