import { deleteResponseService } from '../../services/responses/deleteResponseService.js';

export const deleteResponseController = async (req, res, next) => {
  try {
    // Obtener el id del usuario.
    const user_id = req.body.user_id;

    const consultation_id = req.body.consultation_id;

    // Obtener el id de la respuesta.
    const { response_id } = req.params;

    // Eliminar la respuesta.
    await deleteResponseService(user_id, consultation_id,response_id);

    res.status(200).send({
      status: 'ok',
      message: 'Respuesta eliminada',
    });
  } catch (error) {
    next(error);
  }
};

