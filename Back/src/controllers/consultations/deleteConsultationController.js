import { deleteConsultation } from "../../models/consultations/index.js"
import { generateError } from "../../utils/errors/generateError.js";
import { userValidationController } from "./userValidationController.js";

export const deleteConsultationController = async ( req, res , next) => {

  const consultation_id = req.params.consultation_id
  const user_id = req.body.user_id

  console.log(consultation_id, user_id);

  if (!consultation_id || !user_id) { 
    throw generateError('Los parametros consultation_id y user_id son requeridos',400)
  }
  await userValidationController(user_id, consultation_id)

  await deleteConsultation(consultation_id);

  res.status(200).send({
    status : "consultation deleted",
    }
  )
}