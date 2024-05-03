import { selectRatingsModel } from "../../models/ratings/selectRatingsModel.js"
import { updateRatingsModel } from "../../models/ratings/updateRatingsModel.js";
import { filter } from "../../utils/Filter.js";
import { notAuthorizedError } from "../errorService.js";

export const upadteRatingService = async (newRating_id, rating_value) => { 
  try {
    
    const filtro = `WHERE rating_id = ${newRating_id}`

    const oldRating = await selectRatingsModel(filtro);

    const { rating_id } = oldRating[0]
    
      if (newRating_id !== rating_id) {
        notAuthorizedError();
      }
    
      const newRating = updateRatingsModel(rating_id, rating_value)
    
      return newRating;
    
  } catch (error) {
    console.log('Error al actualizar valoracion ',error);
  }
}