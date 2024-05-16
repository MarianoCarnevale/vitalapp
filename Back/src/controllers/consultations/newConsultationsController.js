import { newConsultationsSchema } from '../../schemas/consultations/consultationsFilterSchema.js';
import { newConsultationService } from '../../services/consultations/newConsultationService.js';
import { generateError } from '../../utils/errors/generateError.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

export const newConsultationsController = async (req, res, next) => {
  try {
    //Sacamos los datos del usuario
    const user_id = req.user.id;
    const data = req.body;

    data.user_id = user_id;

    await validateSchemaUtil(newConsultationsSchema, { data });

    //comprobamos que no falte ningun paramtetro
    if (Object.keys(data).length < 5) {
      throw generateError(
        `Faltan parametros necesitas pasar: consultation_id, user_id, doctor_id, title, description, file, discipline_id, severity, `,
        400
      );
    }

    //hacemos la consulta a la base de datos
    const consultation_id = await newConsultationService(data);

    res.status(200).send({
      status: 'Consulta creada',
      data: consultation_id,
    });
  } catch (error) {
    next(error);
  }
};
