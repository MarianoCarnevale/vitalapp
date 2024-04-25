import { selectConsultations } from '../../models/consultations/index.js';
import { generateError } from '../../utils/errors/generateError.js';

export const consultationsController = async (req, res, next) => {
  try {
    //Si se necesita una consulta especifica
    const consultation_id = await req.params.consultation_id;

    if (consultation_id) {
      const filter = `WHERE consultation_id = '${consultation_id}'`;
      console.log(filter);
      //Recibir datos de la tabla con query de id
      const [consultations] = await selectConsultations(filter, next);
      if (consultations.length === 0) {
        throw generateError('User not Found', 404);
      }

      //respuesta con los datos de la tabla
      res.status(200).send({
        status: 'Ok',
        message: `Tabla de consultas de usuario`,
        data: { consultations },
      });
    } else {
      //recibir datos de la tabla
      const [consultations] = await selectConsultations();

      res.status(200).send({
        status: 'Ok',
        message: `Tabla de consultas`,
        data: { consultations },
      });
    }
  } catch (error) {
    next(error);
  }
};
