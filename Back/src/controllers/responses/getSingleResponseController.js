import { selectAllResponsesByConsultationModel } from '../../models/responses/index.js';

export const getSingleResponseController = async (req, res, next) => {
  try {


    // Obtener el id de la respuesta.
    const { consultation_id } = req.params;

    // Obtener la consulta.
    const response = await selectAllResponsesByConsultationModel(consultation_id);


    // Responder con la respuesta.
    res.status(200).send({
      status: 'Ok',
      message: 'Respuesta obtenida.',
      data: { response },
    });
  } catch (error) {
    next(error);
  }
};
