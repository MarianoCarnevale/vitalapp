// Importamos modelo, el esquema y el validador
import { selectUserByEmailModel } from '../../models/users/selectUserByEmailModel.js';
import { recoverPassSchema } from '../../schemas/users/recoverPassSchema.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { sendEmailUtil } from '../../utils/sendEmailUtil.js';

// Importamos la utilidad para generar un error.
import { generateError } from '../../utils/errors/generateError.js';
import { getRecoverPassByEmailModel } from '../../models/users/getRecoverPassByEmailModel.js';

export const recoverPassController = async (req, res, next) => {
  try {
    // Obtener los datos del body.
    const { email } = req.body;
    console.log('Cogimos el email del req.body');

    // Validamos los datos con Joi.
    await validateSchemaUtil(recoverPassSchema, req.body);

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

    // Si todo va bien y funciona guardamos el codigo de recuperación en una constante
    const recoveryCode = user.recovery_code;

    // Creamos el asunto del email de verificación.
    const emailSubject = 'Recupera tu contraseña en tu cuenta vitalApp';

    // Creamos el cuerpo del email de verificación.
    const emailText = `
    <p>Este es tu código de recuperación ${recoveryCode}</p>
    `;

    // Enviamos el email de verificación.
    await sendEmailUtil(email, emailSubject, emailText);

    // Enviar la respuesta.
    res.status(200).send({
      status: 'ok',
      message: 'Email enviado correctamente',
      data: {
        recoveryCode,
      },
    });
  } catch (error) {
    next(error);
  }
};
