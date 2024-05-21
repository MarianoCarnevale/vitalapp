import { consultationsByUserIdModel } from '../../models/consultations/consultationsByUserIdModel.js';

export const selectConsultationsService = async (array_filter, data) => {
  try {
      // let array_search_filter = '';
      let select_info = '';

      if (data.role === "patient") {
        select_info = `doctor.doctor_id AS doctor_id, doctor.doctor_first_name AS first_name,doctor.doctor_first_surname AS surname,`
      } else {
        select_info = `U.user_id, U.first_name, U.first_surname AS surname,`
      }
    
      const resp = consultationsByUserIdModel(select_info, array_filter);
      
    return resp;

  } catch (error) {
    console.log('Error al insertar en la consulta', error);
    throw error;
  }
};
