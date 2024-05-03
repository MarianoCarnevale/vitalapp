import { insertRatingService } from "../../services/ratings/insertRatingService.js"
import { generateError } from "../../utils/errors/generateError.js"

export const newRatingController = async (req, res, next) => {
  try {
    console.log(req.body);
    const { response_id, user_id, rating_value} = req.body
    
    if (!response_id || !user_id || !rating_value) { 
      throw generateError('Los parametros response_id, user_id y rating_value son requeridos',400)
    }
  
    const data = req.body
  
    const newRating = await insertRatingService(data);
  
    res.status(200).send({
      status: 'ok',
      message: 'valoracion creada',
      data: newRating
    })
    
  } catch (error) {
    next(error)
  }
}