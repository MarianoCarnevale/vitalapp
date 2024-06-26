import { updateConsultationFileModel } from "../../models/consultations/index.js";
import { consultationsFileSchema } from "../../schemas/consultations/consultationsFileSchema.js";
import { FileService } from "../../services/consultations/FileService.js";
import { generateError } from "../../utils/errors/generateError.js";
import { validateSchemaUtil } from "../../utils/validateSchemaUtil.js";

export const ConsultationFileController = async (req, res, next) => {
  try {
    
    //Validar la imagen con joy
    const { consultation_id } = req.params;
    //obtenemos la imagen
    const img = req.files.Files;
    // obtenemos el usuario del token
    const user_id = req.user.id;

    //Validamos el cuerpo de la imagen
    await validateSchemaUtil(consultationsFileSchema, img || {})

    
    if (!img) { 
      throw generateError("Necesita pasar una imagen", 404);
    };
  
    //guardamos la imagen en la carpeta upload
    const fileName = await FileService(
      user_id,
      consultation_id,
      img,
      100
    );
  
     //Actualizar archivo en la base de datos
      await updateConsultationFileModel(consultation_id, fileName)
  
    res.status(200).send({
      status: 'ok',
      message:'Imagen actualizada'
    })
  } catch (error) {
    next(error)
  }
}