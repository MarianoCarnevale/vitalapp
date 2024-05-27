import { selectAllResponsesByConsultationModel } from '../../models/responses/index.js';
import { generateError } from '../../utils/errors/generateError.js';

export const getAllResponsesController = async (req, res, next) => {
  try {
    const { consultation_id } = req.params;

    const responses = await selectAllResponsesByConsultationModel(
      consultation_id,
      user_id
    );

    if (!responses?.length) {
      throw generateError('No hay respuestas', 404);
    }

    res.status(200).send({
      status: 'ok',
      message: 'Respuestas obtenidas',
      data: { responses },
    });
  } catch (error) {
    next(error);
  }
};
