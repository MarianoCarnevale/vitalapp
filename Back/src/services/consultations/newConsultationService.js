import { newConsultationsModel } from '../../models/consultations/index.js';
import { FileService } from './FileService.js';

export const
  newConsultationService = async (data, img) => {
  try {
    // Creamos una id para la consulta.
    data.consultation_id = crypto.randomUUID();

    let file
    if (img) {
      //Creamos el archivo en la carpeta upload
       file = FileService(
        data.user_id,
        data.consultation_id,
        img,
        100
      );
    } else { 
       file = null
    }

    await newConsultationsModel(data, file)

  } catch (error) {
    console.log('Error al insertar en la consulta', error);
    throw error;
  }
};
