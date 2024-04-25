import { postConsultations } from "../../models/consultations/index.js"
import { newConsultationsSchema } from "../../schemas/consultations/consultationsFilterSchema.js";
import { imgSchema } from "../../schemas/imgSchema.js";
import { newConsultationService } from "../../services/consultations/newConsultationService.js";
import { generateError } from "../../utils/errors/generateError.js"
import { validateSchemaUtil } from "../../utils/validateSchemaUtil.js";

export const postConsultationsController = async(req, res, next) =>{
  try {  
    //Sacamos los datos del body
    const data = req.body;
  
    //comprobamos que no falte ningun paramtetro
    if(data.length <= 8){
      throw generateError('There are missing parameters, please make sure that the order of the parameters is as follows: consultation_id, user_id, doctor_id, e-mail, title, symptoms, photo/file, specialty, severity',400)
    }
    
    // await validateSchemaUtil(newConsultationsSchema, data);

    const img = req.files?.image;
    

    if(img){
      await validateSchemaUtil(imgSchema, img);
    }

    //hacemos la consulta a la base de datos
   const consultations = newConsultationService(data);

    res.status(200).send({
      status: 'Consultations created',
    })
  } catch (error) {
    next(error)
  }
}