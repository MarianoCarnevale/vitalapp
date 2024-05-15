import { upadteRatingService } from "../../services/ratings/updateRatingsService.js";
import { generateError } from "../../utils/errors/generateError.js";

export const updateRatingController = async (req, res, next) => { 
  try {
    const rating_id = await req.params.rating_id;
  
    const rating_value = await req.body.rating_value;
  
    if (!rating_id || !rating_value) {
      throw generateError('Es necesario pasar los parametros rating_id y rating_value', 400)
    }
  
    const newRating = upadteRatingService(rating_id, rating_value);
  
    res.status(200).send({
      status: 'ok',
      message: "valoracion actualizada",
      data: { newRating }
    })
  } catch (error) {
    next(error)
  }
}