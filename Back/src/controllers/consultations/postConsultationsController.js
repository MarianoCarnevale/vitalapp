import { postConsultations } from "../../models/consultations/index.js"
import { newConsultationsSchema } from "../../schemas/consultations/consultationsFilterSchema.js";
import { imgSchema } from "../../schemas/imgSchema.js";
import { newConsultationService } from "../../services/consultations/newConsultationService.js";
import { generateError } from "../../utils/errors/generateError.js"
import { validateSchemaUtil } from "../../utils/validateSchemaUtil.js";

export const postConsultationsController = async(req, res, next) =>{
  try {  
    //Sacamos los datos del body
    const user_id = req.user_id
    const data = req.body;
    data.user_id = user_id;
    
    //comprobamos que no falte ningun paramtetro
    if(Object.keys(data).length < 6){
      throw generateError(`Fatlan parametros necesitas pasar: consultation_id, user_id, doctor_id, title, description, file, discipline_id, severity, `, 400)
    }
    
    await validateSchemaUtil(newConsultationsSchema, data);

    const img = req.files?.image;
    

    if(img){
      await validateSchemaUtil(imgSchema, img);
    }

    //hacemos la consulta a la base de datos
   const consultations = newConsultationService(data, img);

    res.status(200).send({
      status: 'Consultations created',
    })
  } catch (error) {
    next(error)
  }
}