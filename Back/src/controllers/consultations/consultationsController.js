import { selectConsultationsService } from '../../services/consultations/selectConsultationsService.js';
import { generateError } from '../../utils/errors/generateError.js';

export const consultationsController = async (req, res, next) => {
  try {
    const user_id = req.user.id;

    const role = req.user.role

    //Obtenemos todos los datos de la busqueda por filtro
    const data = req.body;

    data.role = role;

    //Array de filtro
    let array_filter;

    //Busqueda según usuario
    if (user_id) {
      array_filter = `WHERE (C.user_id = '${user_id}' OR doctor.doctor_user_id = '${user_id}')`;
    }

    //recibir datos de la tabla
    const [consultations] = await selectConsultationsService(
      array_filter,
      data
    );

    if (consultations.length === 0) {
      throw generateError('Consulta no encontrada', 404);
    }

    res.status(200).send({
      status: 'Ok',
      message: `Tabla de consultas`,
      data: { consultations },
    });
  } catch (error) {
    next(error);
  }
};
