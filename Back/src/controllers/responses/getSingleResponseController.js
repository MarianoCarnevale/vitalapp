import { selectResponseByIdModel } from '../../models/responses/index.js';

export const getSingleTweetController = async (req, res, next) => {
  try {
    // Obtener el id de la respuesta.
    const { response_id } = req.params;

    // Obtener el tweet.
    const response = await selectResponseByIdModel(response_id);

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
