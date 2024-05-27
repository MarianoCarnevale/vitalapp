import { selectAllPatientsModel } from '../../models/users/index.js';
import { generateError } from '../../utils/errors/generateError.js';

export const getPatientsController = async (req, res, next) => {
  try {
    // Obtenemos el rol del usuario para tratar información dependiendo si es medico o paciente
    const { role } = req.user;

    // Si es paciente, lanzamos un error ya que solo los doctores pueden obtener esta información
    if (role === 'patient') {
      throw generateError(
        'Los pacientes solo pueden ser vistos por un doctor',
        401
      );
    }

    if (role === 'doctor') {
      // Buscamos los pacientes que estan activos en la bbdd.
      const patients = await selectAllPatientsModel();

      // Devolvemos los pacientes.
      res.status(200).send({
        status: 'ok',
        message: 'Pacientes obtenidos',
        data: { patients },
      });
    }
  } catch (error) {
    next(error);
  }
};
