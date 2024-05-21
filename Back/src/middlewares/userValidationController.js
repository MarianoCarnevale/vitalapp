import { selectOneConsultationByUserIdModel } from "../models/consultations/selectOneConsultationByUserIdModel.js";
import { generateError } from "../utils/errors/generateError.js"

export const userValidationController = async (req, res, next) => {

  const { consultation_id } = req.params;
  
  const { user_id } = req.user.id;

  let array_filter;
  try {

    if (user_id) {

      //Comprobamos que el usuario coincida con el usario de la consulta
       array_filter = `WHERE C.user_id = ${user_id} AND consultation_id = ${consultation_id} `;
      
       }

    const result = await selectOneConsultationByUserIdModel(array_filter)
    
    if (!result) { 
      throw generateError('Usuario no autorizado para esta consulta', 401)
    }
    next();
  } catch (error) {
    next(error);
  }
}
