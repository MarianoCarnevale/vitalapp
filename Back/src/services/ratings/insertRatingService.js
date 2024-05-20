import { insertRatingModel } from '../../models/ratings/insertRatingsModel.js';
import { selectRatingsModel } from '../../models/ratings/selectRatingsModel.js';
import { getPool } from '../../db/getPool.js';
import { generateError } from '../../utils/errors/generateError.js';

export const insertRatingService = async (data) => {
  try {
    const pool = await getPool();
    //evitar que se agrege una valoracion a una respuesta ya valorada
    const response = await pool.query(
      `SELECT * FROM ratings WHERE user_id = ? AND response_id = ?`,
      [data.user_id, data.response_id]
    );
    if (response) {
      throw generateError('Error! , ya has valorado esta respuesta', 401);
    }
    // Creamos una id para la respuesta.
    const newRating_id = crypto.randomUUID();

    data.rating_id = newRating_id;

    // Insertamos la respuesta en la base de datos.
    const rating = await insertRatingModel(data);

    return rating;
  } catch (error) {
    console.log('Error al insertar la respuesta', error);
    throw error;
  }
};
