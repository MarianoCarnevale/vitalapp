import { selectConsultationsModel } from "../../models/consultations/selectConsultationsModel.js";

export const oneConsultationControler = async (req, res, next) => {
  try {
    const { consultation_id } = req.params
      
    const [consultations] = await selectConsultationsModel(consultation_id);
    
    res.status(200).send({
        status: 'Ok',
        message: `Tabla de consultas`,
        data: { consultations },
      });
  } catch (error) {
    next(error)
  }

}