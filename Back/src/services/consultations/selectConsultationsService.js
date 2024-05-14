import { selectConsultationsModel } from '../../models/consultations/index.js';

export const
  selectConsultationsService = async (data) => {
  try {
    
    const resp = await selectConsultationsModel(data);
    
    if (!data) {
        selectConsultationsByUserModel()
    }
    return resp

  } catch (error) {
    console.log('Error al insertar en la consulta', error);
    throw error;
  }
  
};
