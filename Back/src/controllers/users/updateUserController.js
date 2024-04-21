import { updatePatientService } from '../../services/users/updatePatientService.js';
import { updatePatientSchema } from '../../schemas/users/updatePatientSchema.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { updateDoctorSchema } from '../../schemas/users/updateDoctorSchema.js';
import { updateDoctorService } from '../../services/users/updateDoctorService.js';

export const updateUserController = async (req, res, next) => {
  try {
    // Obtenemos el userId
    const userId = req.user.id;

    // Obtenemos si es médico o paciente del token
    const userRole = req.user.role;

    // Trabajaremos en función del rol, lo separamos con un condicional

    if (userRole === 'patient') {
      // Validar el body con Joi.
      await validateSchemaUtil(updatePatientSchema, req.body);

      // Actualizamos el usuario en la base de datos.
      const user = await updatePatientService(userId, req.body);

      // Enviamos solo el username actualizado
      const newUsername = user.username;

      res.send({
        status: 'ok',
        message: 'Paciente actualizado',
        data: { newUsername },
      });
    }

    if (userRole === 'doctor') {
      // Validar el body con Joi.
      await validateSchemaUtil(updateDoctorSchema, req.body);

      // Actualizamos el usuario en la base de datos.
      const user = await updateDoctorService(userId, req.body);

      // Enviamos solo el username actualizado
      const newUsername = user.username;
      res.send({
        status: 'ok',
        message: 'Médico actualizado',
        data: { newUsername },
      });
    }
  } catch (error) {
    next(error);
  }
};
