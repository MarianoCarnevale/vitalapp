import { deleteConsultation } from "../../models/consultations/index.js"

export const deleteConsultationController = async ( req, res , next) => {

  const consultation_id = req.params.consultation_id

  await deleteConsultation(consultation_id);

  res.status(200).send({
    status : "consultation deleted",
    }
  )
}