import {
  selectDoctorByUserIdModel,
  selectUserByIdModel,
} from '../../models/users/index.js';

export const getOwnUserController = async (req, res, next) => {
  try {
    res.header('Access-Control-Allow-Origin', '*');

    // Obtenemos la id del usuario de la request.
    const { id } = req.user;
    // Obtenemos el rol del usuario para tratar información dependiendo si es medico o paciente
    const { role } = req.user;

    if (role === 'patient') {
      // Buscamos el usuario en la base de datos. Si hemos llegado hasta aquí, el usuario existe.
      const user = await selectUserByIdModel(id);

      // Eliminamos los datos que no queremos enviar en la petición de User

      delete user.password;
      delete user.validation_code;
      delete user.recovery_code;

      // Devolvemos el usuario.
      res.status(200).send({
        status: 'ok',
        message: 'Usuario paciente obtenido',
        data: { user },
      });
    }

    if (role === 'doctor') {
      // Buscamos el usuario en la base de datos. Si hemos llegado hasta aquí, el usuario existe.
      const user = await selectDoctorByUserIdModel(id);

      // Devolvemos el usuario.
      res.status(200).send({
        status: 'ok',
        message: 'Usuario doctor obtenido',
        data: { user },
      });
    }
  } catch (error) {
    next(error);
  }
};
