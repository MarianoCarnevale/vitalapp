import { deleteRatingModel } from "../../models/ratings/deleteRatingsModel.js";
import { selectRatingsModel } from "../../models/ratings/selectRatingsModel.js";
import { generateError } from "../../utils/errors/generateError.js"

export const deleteRatingController = async (req, res, next) => { 
  try {
    const { rating_id } = req.params;

    const user_id = req.user.id; 
    
    let filter = `WHERE rating_id = '${rating_id}' AND user_id = '${user_id}'`;
    // Recuperar la valoración de la base de datos.
    const rating = await selectRatingsModel(filter);
    
    if (!rating_id || rating.length === 0) {
      throw generateError('No existe valoración', 400)
    }
    // Comprobar si el user_id es el mismo que el de la respuesta.
    if (rating[0].user_id !== user_id) {
      throw generateError('Usuario no autorizado para borrar la valoración', 401);
    }
  
    await deleteRatingModel(rating_id, user_id);
  
    res.status(200).send({
      status: 'Ok',
      message: 'Valoración borrada con éxito'
    })
  } catch (error) {
    next(error)
  }
}