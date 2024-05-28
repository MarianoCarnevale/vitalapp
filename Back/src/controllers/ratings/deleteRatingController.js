import { deleteRatingModel } from "../../models/ratings/deleteRatingsModel.js";
import { generateError } from "../../utils/errors/generateError.js"

export const deleteRatingController = async (req, res, next) => { 
  try {
    const { rating_id } = req.params;
    
    if (!rating_id) {
      throw generateError('necesitas mandar el rating_id',400)
    }
  
    await deleteRatingModel(rating_id);
  
    res.status(200).send({
      status: 'Ok',
      message: 'Rating deleted'
    })
  } catch (error) {
    next(error)
  }
}