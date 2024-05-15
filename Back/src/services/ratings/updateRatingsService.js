import { selectRatingsModel } from "../../models/ratings/selectRatingsModel.js"
import { updateRatingsModel } from "../../models/ratings/updateRatingsModel.js";

export const upadteRatingService = async (newRating_id, rating_value) => { 
  try {
    // Actualizamos el rating_value donde el rating_id coincida
    const filtro = `WHERE rating_id = ${newRating_id}`

    const oldRating = await selectRatingsModel(filtro);

    //Virificar que el id coincida
    const { rating_id } = oldRating[0]
    
      if (newRating_id !== rating_id) {
        notAuthorizedError();
      }
    
    //Actualizar
      const newRating = updateRatingsModel(rating_id, rating_value)
    
      return newRating;
    
  } catch (error) {
    console.log('Error al actualizar valoracion ',error);
  }
}