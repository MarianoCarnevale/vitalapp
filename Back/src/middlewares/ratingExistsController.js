import { selectRatingsModel } from "../models/ratings/selectRatingsModel.js"
import { generateError } from "../utils/errors/generateError.js";

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
      throw generateError('No existe valoración', 404)
    }

    //todo ok pasar al siguiente middleware
    next();

  } catch (error) {
    next(error)
  }
}