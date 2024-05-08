import { deleteConsultationModel } from "../../models/consultations/index.js"
import { generateError } from "../../utils/errors/generateError.js";

export const deleteConsultationController = async ( req, res , next) => {
  try {
    
    //obtenemos datos del token y la url
    const { consultation_id } = req.params;
    const user_id = req.user.id;
  
    //verificar que existen los parametros
    if (!consultation_id || !user_id) { 
      throw generateError('Los parametros consultation_id y user_id son requeridos', 400);
    }
    //eliminamos la consulta
    await deleteConsultationModel(consultation_id);
  
    res.status(200).send({
      status : "Consulta borrada",
      }
    )

  } catch (error) {
    next(error)
  }
}