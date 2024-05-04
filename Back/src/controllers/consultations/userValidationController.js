import { selectConsultations } from "../../models/consultations/selectConsultations.js"
import { generateError } from "../../utils/errors/generateError.js"

export const userValidationController = async (req, res, next) => {
  const consultation_id = req.params.consultation_id
  const user_id = req.body.user_id

  try {
    //Comprobamos que el usuario coincida con el usario de la consulta
    const filtro = `WHERE user_id = ${user_id} AND consultation_id = ${consultation_id} `
  
    const result = await selectConsultations(filtro)
    
    if (!result) { 
      throw generateError('Usuario no registrado en esta consulta')
    }
    next
  } catch (error) {
    next(error);
  }
}
