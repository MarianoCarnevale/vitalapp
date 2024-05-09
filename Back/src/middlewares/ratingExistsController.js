import { selectRatingsModel } from "../models/ratings/selectRatingsModel.js"
import { notFoundError } from "../services/errorService.js";

export const ratingsExistsController = async (req, res, next) => {
  try {
    //obtener id de la valoracion
    const rating_id = req.params.rating_id
    
    //hacemos el filtro where
    let where = `WHERE rating_id = "${rating_id}"`

    //buscar si existe
    const rating = await selectRatingsModel(where);
  
    //si no existe pasar error
    if (!rating) { 
      throw notFoundError(rating_id)
    }

    //todo ok pasar al siguiente middleware
    next();

  } catch (error) {
    next(error)
  }
}