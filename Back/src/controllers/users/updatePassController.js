// Importamos bcrypt para hashear la nueva contraseña
import bcrypt from 'bcrypt';

// Importamos modelos, esquemas y validadores
import { selectUserByEmailModel } from '../../models/users/selectUserByEmailModel.js';
import { updateUserPassModel } from '../../models/users/updateUserPassModel.js';
import { updatePassSchema } from '../../schemas/users/updatePassSchema.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

// Importamos la utilidad para generar un error.
import { generateError } from '../../utils/errors/generateError.js';

export const updatePassController = async (req, res, next) => {
  try {
    // Obtener los datos del body.
    const { email, password } = req.body;
    console.log('Cogimos el email y la pass del req.body');

    // Validamos los datos con Joi.
    await validateSchemaUtil(updatePassSchema, req.body);

    // Selección del usuario por email.
    const user = await selectUserByEmailModel(email);

    console.log(user);

    // Si no existe un usuario registrado con ese email, creamos un error
    if (!user) {
      throw generateError(
        'No existe ningún usuario registado con ese email',
        401
      );
    }

    // Si existe un usuario registrado con ese email, pero no esta activado creamos un error
    if (!user.is_active) {
      throw generateError(
        'Este usuario está pendiente de activación, revisa el correo',
        401
      );
    }

    // Hasheamos la contraseña.
    // const hashedPass = await bcrypt.hash(password, 10);

    const pruebaPass = '654321';

    // Cambiamos la contraseña en la base de datos
    await updateUserPassModel(pruebaPass, email);

    // Enviar la respuesta.
    res.status(200).send({
      status: 'ok',
      message: 'Contraseña cambiada correctamente',
      data: {
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};
