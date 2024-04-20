import { selectConsultationsBySeverity } from "../../models/consultations/index.js";
import { generateError } from "../../utils/errors/generateError.js";

export const consultationsSeverityController = async (req ,res ,next) => {
  try {
    const  {severity, user_id}  = req.body
    const value = severity.toLowerCase();
    console.log(severity.toLowerCase());
    //revisar que severity este dentro de los valores del enum
    if(value === 'high' || value === 'medium' || value === 'low'){

      //recibir datos de la tabla
      const [consultations] = await selectConsultationsBySeverity(severity, user_id);
      
      //respuesta con los datos de la tabla
      res.status(200).send({
        status : 'Ok',
        message : `Tabla de consultas ${severity}`,
        data : {consultations}
      })
    }else{
      throw generateError(`incorrect parameter ${severity} use high medium or low`,400)
    }
  } catch (error) {
    next(error);
  }
}