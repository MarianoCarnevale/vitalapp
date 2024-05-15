import { selectRatingsModel } from "../models/ratings/selectRatingsModel.js"
import { generateError } from "../utils/errors/generateError.js";

export const ratingsExistsController = async (req, res, next) => {
  try {
    //obtener id de la valoracion
    const { rating_id } = req.params;
    const user_id = req.user_id;
    
    //hacemos el filtro where
    let filter = `WHERE rating_id = "${rating_id}" and user_id = "${user_id}"`

    //buscar si existe
    const rating = await selectRatingsModel(filter);
  
    //si no existe pasar error
    if (!rating) { 
      throw generateError('No existe valoración', 404)
    }

    // esta todo ok pasar al siguiente middleware
    next();

  } catch (error) {
    next(error)
  }
}