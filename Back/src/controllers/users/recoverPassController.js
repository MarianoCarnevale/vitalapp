// Importamos modelo, el esquema y el validador
import { selectUserByEmailModel } from '../../models/users/selectUserByEmailModel.js';
import { recoverPassSchema } from '../../schemas/users/recoverPassSchema.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { sendEmailUtil } from '../../utils/sendEmailUtil.js';

// Importamos la utilidad para generar un error.
import { generateError } from '../../utils/errors/generateError.js';

export const recoverPassController = async (req, res, next) => {
  try {
    // Obtener los datos del body.
    const { email } = req.body;

    // Validamos los datos con Joi.
    await validateSchemaUtil(recoverPassSchema, req.body);

    // Selección del usuario por email.
    const user = await selectUserByEmailModel(email);

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

    // Si todo va bien y funciona guardamos el codigo de recuperación en una constante
    const recoveryCode = user.recovery_code;

    // Creamos el asunto del email de verificación.
    const emailSubject = 'Recupera tu contraseña en tu cuenta vitalApp';

    // Creamos el cuerpo del email de verificación.
    const emailText = `<table width="100%" style="font-family: Arial, sans-serif; text-align:center;">
    <tr>
      <td>
        <h2 style="color: #0398ae; margin: 0;">
          ¡Bienvenid@ ${user.username} a VitalApp!
        </h2>
      </td>
    </tr>
    <tr>
      <td>
      Recibimos una solicitud para restablecer la contraseña de tu cuenta. Si no realizaste esta solicitud, por favor ignora este correo. De lo contrario, haz click en el siguiente enlace:
      </td>
    </tr>
    <tr>
      <td style="padding-top: 20px;">
      <a href="${process.env.RECOVERY_URL}/${recoveryCode}" style="background-color: #0398ae; color: #fff; padding: 10px 20px; text-decoration: none;">Nueva contraseña</a>
      </td>
    </tr>
  </table>`;

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
