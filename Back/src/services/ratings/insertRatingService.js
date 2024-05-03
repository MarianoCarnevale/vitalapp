import { insertRatingModel } from '../../models/ratings/insertRatingsModel.js';

export const insertRatingService = async ( data ) => {
  try {
    // Creamos una id para la respuesta.
    // const newRating_id = crypto.randomUUID();

    // data.rating_id = newRating_id;

    // Insertamos la respuesta en la base de datos.
    const rating = await insertRatingModel(data);

    return rating;
  } catch (error) {
    console.log('Error al insertar la respuesta', error);
    throw error;
  }
};
