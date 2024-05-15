import { upadteRatingService } from "../../services/ratings/updateRatingsService.js";
import { generateError } from "../../utils/errors/generateError.js";

export const updateRatingController = async (req, res, next) => { 
  try {
    const { rating_id } = req.params;
    const user_id = req.user.id;
  
    if (!rating_id) {
      throw generateError('No existe valoración a modificar', 400)
    }
  
    const newRating = upadteRatingService(rating_id);
  
    res.status(200).send({
      status: 'ok',
      message: "valoracion actualizada",
      data: { newRating }
    })
  } catch (error) {
    next(error)
  }
}