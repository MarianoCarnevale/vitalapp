//Modulo para rutas de archivo
import path, { join } from 'path';

//Modulo para redimencionar imagen
import sharp from 'sharp';
import { UPLOADS_DIR } from '../../../env.js';
import { createPathIfNotExistsUtil } from '../../utils/createPathUtil.js';
import { generateError } from '../../utils/errors/generateError.js';
import { updateConsultationFileModel } from '../../models/consultations/updateConsultationFileModel.js';

export const FileService = async (user_id, consultation_id, img, size) => {

  try {
    
    //Ruta donde vamos a guardar el archivo
    const uploadDir = path.join(
      process.cwd(),     //Ruta actual
      UPLOADS_DIR,     // Ruta carpeta upload
      'consultation',     //carpeta de consultas
      consultation_id.toString(),
      'files',     //nombre de la ruta en la que se guardara
      user_id.toString(), //Asignar el id a la ruta
      ''
    )
    //Resultado de ruta: /home/usuario/proyecto/uploads/consultation/consultation_id/files/file_id/
  
    //Creamos la ruta
    await createPathIfNotExistsUtil(uploadDir);
  
    //Crear un objeto sharp con la img recibida
    const imgSharp = sharp(img.data)
  
    //Creamos el id de la imagen con uuid
    const img_id = `${crypto.randomUUID()}.jpg`

    //Redimencioanar la imagen con el sharp y la variable size
    imgSharp.resize(size)
  
    //Ruta de la imagen
    const imgPath = path.join(uploadDir, img_id)
  
    try {
      //Guardamos la imagen
      await imgSharp.toFile(imgPath)
    } catch (error) {
      //Error al guardar la imagen
      throw generateError('Error al guardar imagen en servidor', 500)
    }
  
    return img_id;

  } catch (error) {
    console.log('Error al subir imagen ',error);
  }

}