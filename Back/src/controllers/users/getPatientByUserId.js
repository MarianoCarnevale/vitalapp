import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';
import { generateError } from '../../utils/errors/generateError.js';

export const getPatientByUserId = async (req, res, next) => {
  try {
    // Obtenemos el rol del usuario para tratar información dependiendo si es medico o paciente
    const { role } = req.user;

    //Obtemos el id del paciente por params del cual queremos tener la información
    const { id } = req.params;

    // Si es paciente, lanzamos un error ya que solo los doctores pueden obtener esta información
    if (role === 'patient') {
      throw generateError(
        'Los pacientes solo pueden ser vistos por un doctor',
        401
      );
    }

    if (role === 'doctor') {
      // Buscamos los pacientes que estan activos en la bbdd.
      const patient = await selectUserByIdModel(id);

      // Borramos la información sensible que no queremos enviar en la respuesta
      delete patient.password;
      delete patient.validation_code;
      delete patient.recovery_code;

      console.log(patient);

      // Devolvemos el paciente.
      res.status(200).send({
        status: 'ok',
        message: 'Paciente obtenidos',
        data: { patient },
      });
    }
  } catch (error) {
    next(error);
  }
};
