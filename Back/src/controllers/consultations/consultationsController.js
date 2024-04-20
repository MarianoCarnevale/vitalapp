import { selectConsultations } from "../../models/consultations/index.js"

export const consultationsController = async (req , res, next) => {
  try {
    //recibir datos de la tabla
    const [consultations] = await selectConsultations();

    //respuesta con los datos de la tabla
    res.status(200).send({
      status : 'Ok',
      message : 'Tabla de consultas',
      data : {consultations}
    })

  } catch (error) {
    next(error);
  }
}