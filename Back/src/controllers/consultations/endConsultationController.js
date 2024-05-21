import { endConsultationModal } from "../../models/consultations/endConsultationModal.js"

export const endConsultationController = async (req, res, next) => { 
  try {
    
    const { consultation_id } = req.params
  
    await endConsultationModal(consultation_id)

    res.status(200).send(
      {status: 'Success', message: 'Consulta finalizada corretamente'}
    )
  } catch (error) {
    next(error)
  }
}