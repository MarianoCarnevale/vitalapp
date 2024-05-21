import { selectResponseByIdModel } from '../../models/responses/selectResponseByIdModel.js';
import { ratingSchema } from '../../schemas/ratings/ratingsSchema.js';
import { insertRatingService } from '../../services/ratings/insertRatingService.js';
import { generateError } from '../../utils/errors/generateError.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

export const newRatingController = async (req, res, next) => {
  try {
    const { response_id } = req.params;
    const user_id = req.user.id;

    const [response] = await selectResponseByIdModel(response_id);
    console.log(response);
    const userResponseId = response.user_id;
    console.log(userResponseId);
    if (userResponseId === user_id) {
      throw generateError('No puedes votar tu propia respuesta', 401);
    }

    if (!response_id || !user_id) {
      throw generateError('Error al valorar la respuesta', 400);
    }
    // pasamos el rating value por data al body
    const data = req.body;

    await validateSchemaUtil(ratingSchema, data);
    // añadimo en data todos los parametros necesarios
    data.user_id = user_id;
    data.response_id = response_id;

    const newRating = await insertRatingService(data);

    res.status(200).send({
      status: 'ok',
      message: 'Valoracion creada',
      data: newRating,
    });
  } catch (error) {
    next(error);
  }
};
