import { newConsultationsModel } from '../../models/consultations/index.js';
import { FileService } from './FileService.js';

export const
  newConsultationService = async (data, file) => {
  try {
    // Creamos una id para la consulta.
    data.consultation_id = crypto.randomUUID();

    const resp = await newConsultationsModel(data, file)

    return resp

  } catch (error) {
    console.log('Error al insertar en la consulta', error);
    throw error;
  }
  
};
