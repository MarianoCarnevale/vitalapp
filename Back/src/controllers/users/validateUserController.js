import { selectUserByValidationCodeModel } from '../../models/users/index.js';
import { updateUserActivationModel } from '../../models/users/index.js';

export const validateUserController = async (req, res, next) => {
  try {
    console.log('validateUserController');
    // Obtener el código de registro.
    const { validation_code } = req.params;

    console.log(validation_code);

    // Verificar si existe un usuario con ese código de registro.
    await selectUserByValidationCodeModel(validation_code);
    // Activar el usuario.
    const result = await updateUserActivationModel(validation_code);

    // Devolver una respuesta.
    res.status(201).send({
      status: 'ok',
      message: 'Usuario validado correctamente',
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};
