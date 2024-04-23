// Importamos el esquema.
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { newUserSchema } from '../../schemas/users/newUserSchema.js';

// Importamos los servicios.
import { insertUserService } from '../../services/users/insertUserService.js';
import { newDoctorSchema } from '../../schemas/users/newDoctorSchema.js';

export const newUserController = async (req, res, next) => {
  try {
    // Obtener el cuerpo de la petición.
    const {
      username,
      email,
      password,
      role,
      first_name,
      first_surname,
      doctor_registration_number,
      discipline_name,
      experience,
    } = req.body;

    // Validar el body si el rol es médico.
    if (role === 'doctor') {
      await validateSchemaUtil(newDoctorSchema, req.body);
    } else {
      await validateSchemaUtil(newUserSchema, req.body);
    }

    // Crear una uuid para el codigo de registro.
    const validation_code = crypto.randomUUID();

    // Crear una uuid para el codigo de recuperacion.
    const recovery_code = crypto.randomUUID();

    // Insertar el usuario en la base de datos.
    await insertUserService(
      username,
      email,
      password,
      role,
      validation_code,
      recovery_code,
      first_name,
      first_surname,
      doctor_registration_number,
      discipline_name,
      experience
    );

    // Responder al cliente.
    res.status(201).send({
      status: 'ok',
      message: 'Usuario creado, revisa tu email para activarlo',
      data: { validation_code },
    });
  } catch (error) {
    next(error);
  }
};
