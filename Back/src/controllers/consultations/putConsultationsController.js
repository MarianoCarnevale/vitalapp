import { putConsultations } from "../../models/consultations/index.js"
import { newConsultationsSchema } from "../../schemas/consultations/consultationsFilterSchema.js";
import { generateError } from "../../utils/errors/generateError.js"
import { validateSchemaUtil } from "../../utils/validateSchemaUtil.js";

export const putConsultationsController = async(req, res, next) =>{
  try {  
    //Sacamos los datos del body
    const data = req.body;
  
    //comprobamos que no falte ningun paramtetro
    if(data.length <= 9){
      throw generateError('There are missing parameters, please make sure that the order of the parameters is as follows: consultation_id, user_id, doctor_id, e-mail, title, symptoms, photo/file, specialty, severity',400)
    }
    
    await validateSchemaUtil(newConsultationsSchema, data);

    //hacemos la consulta a la base de datos
   putConsultations(data);

    res.status(200).send({
      status: 'Ok',
      message : message
    })
  } catch (error) {
    next(error)
  }
}