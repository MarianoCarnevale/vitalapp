import {
  reactivateUserByEmailModel,
  selectUserByEmailModel,
} from '../../models/users/index.js';
import { recoverPassSchema } from '../../schemas/users/recoverPassSchema.js';
import { generateError } from '../../utils/errors/generateError.js';
import { sendEmailUtil } from '../../utils/sendEmailUtil.js';
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
      throw generateError('No existe un usuario con ese email', 404);
    }

    // Comprobamos que el usuario no esté activado
    if (user.is_active === 1) {
      throw generateError('El usuario ya está activo', 500);
    }

    // // Si existe y no está activado, reactivamos su cuenta a través de su model
    // const userActivated = await reactivateUserByEmailModel(email);

    // Creamos el asunto del email de verificación.
    const emailSubject = 'Reactiva tu usuario en vitalApp';

    // Creamos el cuerpo del email de verificación.
    const emailText = `
    <table width="100%" style="font-family: Arial, sans-serif; text-align:center;">
      <tr>
        <td>
          <h2 style="color: #0398ae; margin: 0;">
            ¡Bienvenid@ de vuelta ${user.username} a VitalApp!
          </h2>
        </td>
      </tr>
      <tr>
        <td>
          Para reactivar tu cuenta, haz click en el siguiente enlace:
        </td>
      </tr>
      <tr>
        <td style="padding-top: 20px;">
          <a href="${process.env.VALIDATION_URL}/${user.validation_code}" style="background-color: #0398ae; color: #fff; padding: 10px 20px; text-decoration: none;">Activa tu cuenta
          </a>
        </td>
      </tr>
    </table>
  `;
    // Enviamos el email de verificación.
    await sendEmailUtil(email, emailSubject, emailText);

    // Respondemos con un status ok
    res.status(200).send({
      status: 'ok',
      message: 'Email de reactivación enviado con éxito',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
